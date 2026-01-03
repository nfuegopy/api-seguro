import {
  Injectable,
  NotFoundException,
  BadRequestException,
  Logger,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, DataSource } from 'typeorm';
import { Cotizacion, EstadoCotizacion } from './entities/cotizacion.entity';
import { CreateCotizacionDto } from './dto/create-cotizacion.dto';
import { UsuariosService } from '../../gestion/usuarios/usuarios.service';
import {
  ProductoSeguro,
  TipoCalculo,
} from '../../referenciales/parametros/productos_seguro/entities/producto_seguro.entity';
import { VehiculoMarca } from '../../referenciales/parametros/vehiculo_marcas/entities/vehiculo_marca.entity';
import { VehiculoModelo } from '../../referenciales/parametros/vehiculo_modelos/entities/vehiculo_modelo.entity';
import { NivelCobertura } from '../niveles-coberturas/entities/nivel-cobertura.entity';
import { NotificationsService } from '../../common/notifications/notifications.service';

@Injectable()
export class CotizacionesService {
  private readonly logger = new Logger(CotizacionesService.name);

  constructor(
    @InjectRepository(Cotizacion)
    private readonly cotizacionRepo: Repository<Cotizacion>,
    @InjectRepository(ProductoSeguro)
    private readonly productoRepo: Repository<ProductoSeguro>,
    @InjectRepository(VehiculoMarca)
    private readonly marcaRepo: Repository<VehiculoMarca>,
    @InjectRepository(VehiculoModelo)
    private readonly modeloRepo: Repository<VehiculoModelo>,
    @InjectRepository(NivelCobertura)
    private readonly nivelRepo: Repository<NivelCobertura>,
    private readonly usuariosService: UsuariosService,
    private readonly dataSource: DataSource,
    private readonly notificationsService: NotificationsService,
  ) {}

  async crear(dto: CreateCotizacionDto) {
    // 1. Validar Producto
    const producto = await this.productoRepo.findOneBy({
      id: dto.producto_seguro_id,
    });
    if (!producto) throw new NotFoundException('Producto no encontrado');

    // 2. Gestionar Usuario (Igual que antes)
    const datosPersona = {
      nombre: dto.nombre_usuario || 'Cliente',
      apellido: dto.apellido_usuario || 'Web',
      documentos: [{ tipo_documento_id: 1, numero: 'TEMP-' + Date.now() }],
    };
    const usuario = await this.usuariosService.findOrCreateByEmail(
      dto.email_usuario,
      datosPersona,
    );

    // 3. RECUPERAR NIVEL (Necesario para cualquier cálculo)
    const nivel = await this.nivelRepo.findOneBy({
      id: dto.nivel_cobertura_id,
    });
    if (!nivel) throw new NotFoundException('Nivel de cobertura inválido');

    // --- LÓGICA DINÁMICA ---
    let precioAnual = 0;
    let detallesCorreo: any = { cobertura: nivel.nombre_nivel }; // Objeto base para el email

    // Usamos el TIPO DE CÁLCULO para saber qué datos buscar dentro de 'datos_vehiculo'
    switch (producto.tipo_calculo) {
      case TipoCalculo.DINAMICO_VEHICULAR:
        // Aquí extraemos datos específicos de AUTO
        const marcaId = Number(dto.datos_vehiculo['marca_id']);
        const modeloId = Number(dto.datos_vehiculo['modelo_id']);

        // Buscamos en BD solo si es necesario
        const marca = await this.marcaRepo.findOneBy({ id: marcaId });
        const factorRiesgo = marca ? Number(marca.factor_riesgo) : 1.0;

        // Limpieza del valor fiscal (quita puntos y comas)
        let valorFiscalRaw =
          dto.datos_vehiculo['valor_fiscal'] || dto.datos_vehiculo['Precio']; // Soporta ambas keys
        if (typeof valorFiscalRaw === 'string') {
          valorFiscalRaw = valorFiscalRaw.replace(/\./g, '').replace(/,/g, '');
        }
        const valorFiscal = Number(valorFiscalRaw);

        // Fórmula
        const tasa = Number(nivel.prima_anual_base);
        precioAnual = valorFiscal * (tasa / 100) * factorRiesgo;

        // Datos para el correo de Auto
        detallesCorreo.marca = marca ? marca.nombre : 'Generica';
        detallesCorreo.anio =
          dto.datos_vehiculo['anio_fabricacion'] || dto.datos_vehiculo['anio'];
        detallesCorreo.matricula =
          dto.datos_vehiculo['matricula'] || dto.datos_vehiculo['chasis']; // Usamos chasis si no hay matricula
        detallesCorreo.valor_asegurado = new Intl.NumberFormat('es-PY').format(
          valorFiscal,
        );
        break;

      case 'PRECIO_FIJO': // O el enum que uses
      default:
        // Lógica simple: El precio viene directo de la base del nivel
        precioAnual = Number(nivel.prima_anual_base);
        detallesCorreo.tipo = 'Plan de Precio Fijo';
        break;
    }

    // 4. Finalizar Cálculo
    precioAnual = Math.round(precioAnual);
    const cuotaMensual = Math.round(precioAnual / 12);

    // 5. Guardar
    const nuevaCotizacion = this.cotizacionRepo.create({
      usuario_id: usuario.id,
      producto_seguro_id: producto.id,
      datos_vehiculo: dto.datos_vehiculo, // Guardamos el JSON crudo para referencia futura
      precio_calculado: precioAnual,
      cuota_mensual: cuotaMensual,
      estado: EstadoCotizacion.ENVIADA,
    });

    await this.cotizacionRepo.save(nuevaCotizacion);

    // 6. Enviar Correo (Usando los detalles dinámicos armados arriba)
    const precioFormateado =
      new Intl.NumberFormat('es-PY').format(precioAnual) + ' Gs.';

    // NOTA: Asegúrate que tu notificationsService acepte un objeto genérico en 'detallesCorreo'
    // o ajusta tu template HTML para iterar sobre las claves.
    await this.notificationsService.sendCotizacionEmail(
      dto.email_usuario,
      `${dto.nombre_usuario} ${dto.apellido_usuario}`,
      producto.nombre_producto,
      precioFormateado,
      detallesCorreo,
    );

    return nuevaCotizacion;
  }

  async findAll() {
    return await this.cotizacionRepo.find({
      relations: ['usuario', 'productoSeguro'],
      order: { fecha_solicitud: 'DESC' },
    });
  }
}
