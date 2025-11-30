/* eslint-disable prettier/prettier */

import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseInterceptors,
  UploadedFile,
  ParseFilePipe,
  MaxFileSizeValidator,
  //  FileTypeValidator,
  ParseIntPipe,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { SeccionesWebService } from './secciones-web.service';
import { CreateSeccionWebDto } from './dto/create-seccion-web.dto';
import { UpdateSeccionWebDto } from './dto/update-seccion-web.dto';

@Controller('secciones-web')
export class SeccionesWebController {
  constructor(private readonly seccionesWebService: SeccionesWebService) {}

  @Post()
  @UseInterceptors(FileInterceptor('imagen')) // 'imagen' es el nombre del campo en el form-data
  create(
    @Body() createSeccionWebDto: CreateSeccionWebDto,
    @UploadedFile(
      new ParseFilePipe({
        validators: [
          new MaxFileSizeValidator({ maxSize: 5 * 1024 * 1024 }), // 5 MB
          //
        ],
      }),
    )
    file: Express.Multer.File,
  ) {
    return this.seccionesWebService.create(createSeccionWebDto, file);
  }

  @Get()
  findAll() {
    return this.seccionesWebService.findAll();
  }

  // --- NUEVO ENDPOINT: Listar solo activos ---
  @Get('activos')
  findAllActive() {
    return this.seccionesWebService.findAllActive();
  }

  // --- NUEVO ENDPOINT: Buscar uno por ID ---
  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.seccionesWebService.findOne(id);
  }

  // --- NUEVO ENDPOINT: Actualizar ---
  @Patch(':id')
  @UseInterceptors(FileInterceptor('imagen')) // Permite recibir un archivo
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateSeccionWebDto: UpdateSeccionWebDto,
    @UploadedFile(
      // La validación es opcional en la actualización
      new ParseFilePipe({
        validators: [
          new MaxFileSizeValidator({ maxSize: 5 * 1024 * 1024 }),
          //
        ],
        fileIsRequired: false, // <-- IMPORTANTE: el archivo no es obligatorio
      }),
    )
    file?: Express.Multer.File,
  ) {
    return this.seccionesWebService.update(id, updateSeccionWebDto, file);
  }

  // --- NUEVO ENDPOINT: Eliminar ---
  @Delete(':id')
  @HttpCode(HttpStatus.OK) // Devuelve un 200 OK en lugar de 204 No Content
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.seccionesWebService.remove(id);
  }
}
