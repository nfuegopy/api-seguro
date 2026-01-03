import {
  Injectable,
  NotFoundException,
  BadRequestException,
  Logger, // 1. Agregamos Logger
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
import { NivelCobertura } from '../niveles-coberturas/entities/nivel-cobertura.entity';

// 2. Importamos el servicio de notificaciones
import { NotificationsService } from '../../common/notifications/notifications.service';

@Injectable()
export class CotizacionesService {
  // 3. Inicializamos el Logger para registrar errores sin romper la app
  private readonly logger = new Logger(CotizacionesService.name);

  constructor(
    @InjectRepository(Cotizacion)
    private readonly cotizacionRepo: Repository<Cotizacion>,
    @InjectRepository(ProductoSeguro)
    private readonly productoRepo: Repository<ProductoSeguro>,
    @InjectRepository(VehiculoMarca)
    private readonly marcaRepo: Repository<VehiculoMarca>,
    @InjectRepository(NivelCobertura)
    private readonly nivelRepo: Repository<NivelCobertura>,
    private readonly usuariosService: UsuariosService,
    private readonly dataSource: DataSource,
    // 4. Inyectamos el servicio de notificaciones
    private readonly notificationsService: NotificationsService,
  ) {}

  async crear(dto: CreateCotizacionDto) {
    // 1. Validar Producto
    const producto = await this.productoRepo.findOneBy({
      id: dto.producto_seguro_id,
    });
    if (!producto)
      throw new NotFoundException('Producto de seguro no encontrado');

    // 2. Obtener o Crear Usuario
    const datosPersona = {
      nombre: dto.nombre_usuario || 'Usuario',
      apellido: dto.apellido_usuario || 'Web',
      documentos: [{ tipo_documento_id: 1, numero: 'TEMP-' + Date.now() }],
    };

    const usuario = await this.usuariosService.findOrCreateByEmail(
      dto.email_usuario,
      datosPersona,
    );

    // 3. CALCULAR PRECIO
    let precioAnual = 0;
    let cuotaMensual = 0;

    const nivel = await this.nivelRepo.findOneBy({
      id: dto.nivel_cobertura_id,
    });
    if (!nivel) throw new NotFoundException('Nivel de cobertura no válido');

    if (producto.tipo_calculo === TipoCalculo.DINAMICO_VEHICULAR) {
      // --- LÓGICA DINÁMICA (VEHÍCULOS) ---
      const valorFiscal = Number(dto.datos_vehiculo['valor_fiscal']);
      if (!valorFiscal || valorFiscal <= 0) {
        throw new BadRequestException(
          'El valor fiscal del vehículo es requerido para calcular el seguro.',
        );
      }

      const marcaId = Number(dto.datos_vehiculo['marca_id']);
      const marca = await this.marcaRepo.findOneBy({ id: marcaId });
      const factorRiesgoMarca = marca ? Number(marca.factor_riesgo) : 1.0;

      const tasaPorcentaje = Number(nivel.prima_anual_base);

      precioAnual = Number(
        (valorFiscal * (tasaPorcentaje / 100) * factorRiesgoMarca).toFixed(2),
      );
      cuotaMensual = precioAnual / 12;
    } else {
      // --- LÓGICA PRECIO FIJO ---
      precioAnual = Number(nivel.prima_anual_base);
      cuotaMensual = precioAnual / 12;
    }

    // 4. Guardar Cotización
    const nuevaCotizacion = this.cotizacionRepo.create({
      usuario_id: usuario.id,
      producto_seguro_id: producto.id,
      datos_vehiculo: dto.datos_vehiculo,
      precio_calculado: precioAnual,
      cuota_mensual: cuotaMensual,
      estado: EstadoCotizacion.ENVIADA,
    });

    // Guardamos primero para asegurar el dato en BD
    const cotizacionGuardada = await this.cotizacionRepo.save(nuevaCotizacion);

    // 5. ENVÍO DE NOTIFICACIÓN (Bloque Seguro)
    try {
      const precioFormateado = precioAnual.toLocaleString('es-PY');
      const nombreCliente = dto.nombre_usuario || 'Cliente';

      await this.notificationsService.sendCotizacionEmail(
        dto.email_usuario,
        nombreCliente,
        producto.nombre_producto, // <--- CORRECCIÓN CRÍTICA: nombre_producto
        precioFormateado,
      );
      this.logger.log(
        `📧 Notificación enviada exitosamente a ${dto.email_usuario}`,
      );
    } catch (error) {
      // Si falla el correo, solo lo registramos en consola, NO lanzamos error
      // para que el usuario reciba su cotización (json) correctamente.
      this.logger.error(
        `⚠️ Error enviando correo de cotización: ${error.message}`,
      );
    }

    return cotizacionGuardada;
  }

  async findAll() {
    return await this.cotizacionRepo.find({
      relations: ['usuario', 'productoSeguro'],
      order: { fecha_solicitud: 'DESC' },
    });
  }
}
