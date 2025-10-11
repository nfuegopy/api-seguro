/* eslint-disable prettier/prettier */

import {
  Controller,
  Post,
  Body,
  UseInterceptors,
  UploadedFile,
  ParseFilePipe,
  MaxFileSizeValidator,
  FileTypeValidator,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { SeccionesWebService } from './secciones-web.service';
import { CreateSeccionWebDto } from './dto/create-seccion-web.dto';

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
          new FileTypeValidator({ fileType: '.(png|jpeg|jpg|webp)' }),
        ],
      }),
    )
    file: Express.Multer.File,
  ) {
    return this.seccionesWebService.create(createSeccionWebDto, file);
  }

  // ... aquí irían los otros métodos del CRUD (findAll, findOne, update, remove)
}
