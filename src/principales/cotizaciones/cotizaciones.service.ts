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
    // 1. Validaciones
    const producto = await this.productoRepo.findOneBy({
      id: dto.producto_seguro_id,
    });
    if (!producto) throw new NotFoundException('Producto no encontrado');

    const usuario = await this.usuariosService.findOrCreateByEmail(
      dto.email_usuario,
      {
        nombre: dto.nombre_usuario || 'Cliente',
        apellido: dto.apellido_usuario || '',
        documentos: [{ tipo_documento_id: 1, numero: 'TEMP-' + Date.now() }],
      },
    );

    const nivel = await this.nivelRepo.findOneBy({
      id: dto.nivel_cobertura_id,
    });
    if (!nivel) throw new NotFoundException('Nivel no válido');

    // 2. RECUPERAR DATOS (Sin mezclar Chasis y Matrícula)
    const datosRaw = dto.datos_vehiculo;

    // IDs de Marca y Modelo
    const marcaId = Number(datosRaw['marca_id']);
    const modeloId = Number(datosRaw['modelo_id']);
    const marca = marcaId
      ? await this.marcaRepo.findOneBy({ id: marcaId })
      : null;
    const modelo = modeloId
      ? await this.modeloRepo.findOneBy({ id: modeloId })
      : null;

    // Valor Fiscal y Año
    const valorFiscalRaw = datosRaw['valor_fiscal'] || datosRaw['Precio'] || 0;
    const valorFiscal = Number(
      String(valorFiscalRaw).replace(/\./g, '').replace(/,/g, ''),
    );
    const anio = datosRaw['anio'] || datosRaw['anio_fabricacion'] || 'N/A';

    // DATOS IDENTIFICATORIOS (Separados)
    // Si no vienen, se quedan como null o string vacío, el notificador pondrá el guión '-'
    const matricula = datosRaw['matricula'];
    const chasis = datosRaw['chasis'];

    // 3. CÁLCULO DE PRECIO
    let precioAnual = 0;
    const tasa = Number(nivel.prima_anual_base);
    const factorRiesgo =
      producto.tipo_calculo === 'DINAMICO_VEHICULAR' && marca
        ? Number(marca.factor_riesgo)
        : 1.0;

    if (producto.tipo_calculo === 'DINAMICO_VEHICULAR') {
      precioAnual = valorFiscal * (tasa / 100) * factorRiesgo;
    } else {
      precioAnual = tasa;
    }

    precioAnual = Math.round(precioAnual);
    const cuotaMensual = Math.round(precioAnual / 12);

    // 4. PREPARAR OBJETO PARA EL CORREO
    const fmt = new Intl.NumberFormat('es-PY');

    // Aquí definimos EXACTAMENTE qué filas queremos ver en el correo
    const detallesCorreo = {
      Vehículo: `${marca ? marca.nombre : 'Genérico'} ${modelo ? modelo.nombre : ''}`,
      Año: anio,
      Matrícula: matricula, // Se enviará como clave separada
      Chasis: chasis, // Se enviará como clave separada
      'Valor Asegurado': fmt.format(valorFiscal) + ' Gs.',
      Cobertura: nivel.nombre_nivel,
    };

    // 5. GUARDAR Y ENVIAR
    const nuevaCotizacion = this.cotizacionRepo.create({
      usuario_id: usuario.id,
      producto_seguro_id: producto.id,
      datos_vehiculo: dto.datos_vehiculo,
      precio_calculado: precioAnual,
      cuota_mensual: cuotaMensual,
      estado: EstadoCotizacion.ENVIADA,
    });

    await this.cotizacionRepo.save(nuevaCotizacion);

    try {
      await this.notificationsService.sendCotizacionEmail(
        dto.email_usuario,
        `${dto.nombre_usuario} ${dto.apellido_usuario}`,
        producto.nombre_producto,
        fmt.format(precioAnual) + ' Gs.',
        detallesCorreo, // Pasamos el objeto con las claves separadas
      );
    } catch (error) {
      this.logger.error(`Error mail: ${error.message}`);
    }

    return nuevaCotizacion;
  }

  async findAll() {
    return await this.cotizacionRepo.find({
      relations: ['usuario', 'productoSeguro'],
      order: { fecha_solicitud: 'DESC' },
    });
  }
}
