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
    if (!producto)
      throw new NotFoundException('Producto de seguro no encontrado');

    // --- LOG DE DIAGNÓSTICO ---
    this.logger.debug(`🔍 Producto Encontrado: ${producto.nombre_producto}`);
    this.logger.debug(`📊 Tipo Cálculo en BD: "${producto.tipo_calculo}"`);

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

    // 3. RECUPERAR DATOS RELACIONADOS (Marca, Modelo, Nivel)
    const marcaId = Number(dto.datos_vehiculo['marca_id']);
    const modeloId = Number(dto.datos_vehiculo['modelo_id']);

    const [marca, modelo, nivel] = await Promise.all([
      this.marcaRepo.findOneBy({ id: marcaId }),
      this.modeloRepo.findOneBy({ id: modeloId }),
      this.nivelRepo.findOneBy({ id: dto.nivel_cobertura_id }),
    ]);

    if (!nivel) throw new NotFoundException('Nivel de cobertura no válido');

    if (!modelo) {
      this.logger.warn(
        `⚠️ Modelo ID ${modeloId} no encontrado en la base de datos.`,
      );
    }

    const nombreMarca = marca ? marca.nombre : 'Desconocida';
    const nombreModelo = modelo ? modelo.nombre : 'Desconocido';

    // 4. CALCULAR PRECIO
    let precioAnual = 0;

    if (producto.tipo_calculo === TipoCalculo.DINAMICO_VEHICULAR) {
      let valorFiscalRaw = dto.datos_vehiculo['valor_fiscal'];
      if (typeof valorFiscalRaw === 'string') {
        valorFiscalRaw = valorFiscalRaw.replace(/\./g, '').replace(/,/g, '');
      }
      const valorFiscal = Number(valorFiscalRaw);

      if (!valorFiscal || valorFiscal <= 0) {
        throw new BadRequestException(
          'El valor fiscal es inválido (0 o negativo).',
        );
      }

      const factorRiesgoMarca = marca ? Number(marca.factor_riesgo) : 1.0;
      const tasaPorcentaje = Number(nivel.prima_anual_base);

      this.logger.log(
        `🧮 Calculando: Valor(${valorFiscal}) * Tasa(${tasaPorcentaje}%) * Factor(${factorRiesgoMarca})`,
      );

      precioAnual = valorFiscal * (tasaPorcentaje / 100) * factorRiesgoMarca;
    } else {
      this.logger.warn(`⚠️ Entrando a lógica de PRECIO FIJO.`);
      precioAnual = Number(nivel.prima_anual_base);
    }

    precioAnual = Math.round(precioAnual);
    const cuotaMensual = Math.round(precioAnual / 12);

    // 5. Guardar Cotización
    const nuevaCotizacion = this.cotizacionRepo.create({
      usuario_id: usuario.id,
      producto_seguro_id: producto.id,
      datos_vehiculo: dto.datos_vehiculo,
      precio_calculado: precioAnual,
      cuota_mensual: cuotaMensual,
      estado: EstadoCotizacion.ENVIADA,
    });

    const cotizacionGuardada = await this.cotizacionRepo.save(nuevaCotizacion);

    // 6. ENVÍO DE CORREO CON MÁS DATOS
    try {
      const formateador = new Intl.NumberFormat('es-PY', {
        style: 'decimal',
        maximumFractionDigits: 0,
      });
      const precioFormateado = formateador.format(precioAnual) + ' Gs.';

      const detallesCorreo = {
        marca: nombreMarca,
        modelo: nombreModelo,
        anio: dto.datos_vehiculo['anio'],
        matricula: dto.datos_vehiculo['matricula'],
        uso: dto.datos_vehiculo['uso'] || 'Particular',
        valorFiscal:
          formateador.format(Number(dto.datos_vehiculo['valor_fiscal'] || 0)) +
          ' Gs.',
        // CORREGIDO AQUÍ:
        cobertura: nivel.nombre_nivel,
      };

      const nombreCliente = `${dto.nombre_usuario} ${dto.apellido_usuario}`;

      await this.notificationsService.sendCotizacionEmail(
        dto.email_usuario,
        nombreCliente,
        producto.nombre_producto,
        precioFormateado,
        detallesCorreo,
      );
    } catch (error) {
      this.logger.error(`❌ Error enviando correo: ${error.message}`);
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
