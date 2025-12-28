import {
  Injectable,
  NotFoundException,
  BadRequestException,
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
// TU IMPORT CORRECTO:
import { NivelCobertura } from '../niveles-coberturas/entities/nivel-cobertura.entity';

@Injectable()
export class CotizacionesService {
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

    // Buscamos el nivel de cobertura seleccionado para obtener la TASA o PRECIO
    // Nota: dto.nivel_cobertura_id debe existir en tu DTO ahora.
    const nivel = await this.nivelRepo.findOneBy({
      id: dto.nivel_cobertura_id,
    });
    if (!nivel) throw new NotFoundException('Nivel de cobertura no válido');

    if (producto.tipo_calculo === TipoCalculo.DINAMICO_VEHICULAR) {
      // --- LÓGICA DINÁMICA (VEHÍCULOS) ---

      // A. Validar Valor Fiscal
      const valorFiscal = Number(dto.datos_vehiculo['valor_fiscal']);
      if (!valorFiscal || valorFiscal <= 0) {
        throw new BadRequestException(
          'El valor fiscal del vehículo es requerido para calcular el seguro.',
        );
      }

      // B. Obtener factor de la marca
      const marcaId = Number(dto.datos_vehiculo['marca_id']);
      const marca = await this.marcaRepo.findOneBy({ id: marcaId });
      const factorRiesgoMarca = marca ? Number(marca.factor_riesgo) : 1.0;

      // C. Obtener Tasa (Porcentaje)
      // En DB guardamos 3.60 para representar 3.6%
      const tasaPorcentaje = Number(nivel.prima_anual_base);

      // D. FÓRMULA FINAL: Valor * (Tasa/100) * FactorMarca
      precioAnual = Number(
        (valorFiscal * (tasaPorcentaje / 100) * factorRiesgoMarca).toFixed(2),
      );
      // E. Calcular Mensualidad
      cuotaMensual = precioAnual / 12;
    } else {
      // --- LÓGICA PRECIO FIJO (Vida, Accidentes, etc) ---
      // Aquí 'prima_anual_base' es el precio directo en moneda, no un porcentaje.
      precioAnual = Number(nivel.prima_anual_base);
      cuotaMensual = precioAnual / 12;
    }

    // 4. Guardar Cotización
    const nuevaCotizacion = this.cotizacionRepo.create({
      usuario_id: usuario.id,
      producto_seguro_id: producto.id,
      datos_vehiculo: dto.datos_vehiculo,

      // Guardamos ambos valores calculados
      precio_calculado: precioAnual,
      cuota_mensual: cuotaMensual,

      estado: EstadoCotizacion.ENVIADA,
    });

    return await this.cotizacionRepo.save(nuevaCotizacion);
  }

  async findAll() {
    return await this.cotizacionRepo.find({
      relations: ['usuario', 'productoSeguro'],
      order: { fecha_solicitud: 'DESC' },
    });
  }
}
