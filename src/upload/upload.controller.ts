/* eslint-disable prettier/prettier */

import {
  Controller,
  Post,
  UploadedFiles,
  UseInterceptors,
  BadRequestException,
} from '@nestjs/common';
import { FileFieldsInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname } from 'path';
import { v4 as uuidv4 } from 'uuid';
import { Express } from 'express'; 

function customFileStorage(destination: string) {
  return diskStorage({
    destination,
    filename: (req, file, cb) => {
      const uniqueName = `${uuidv4()}${extname(file.originalname)}`;
      cb(null, uniqueName);
    },
  });
}

@Controller('upload')
export class UploadController {
  @Post('item')
  @UseInterceptors(
    FileFieldsInterceptor([{ name: 'images', maxCount: 10 }], {
      storage: customFileStorage('./item-images'),
      fileFilter: (req, file, cb) => {
        if (!file.mimetype.match(/\/(jpg|jpeg|png|webp)$/)) {
          cb(new BadRequestException('Only image files are allowed!'), false);
        } else {
          cb(null, true);
        }
      },
      limits: { fileSize: 5 * 1024 * 1024 }, // 5 MB max
    }),
  )
  async uploadItemImages(
    @UploadedFiles() files: { images?: Express.Multer.File[] },
  ) {
    const urls = files.images?.map(file => `/item-images/${file.filename}`) || [];
    return { images: urls };
  }

  @Post('item-variation')
  @UseInterceptors(
    FileFieldsInterceptor([{ name: 'images', maxCount: 10 }], {
      storage: customFileStorage('./item-variation-images'),
      fileFilter: (req, file, cb) => {
        if (!file.mimetype.match(/\/(jpg|jpeg|png|webp)$/)) {
          cb(new BadRequestException('Only image files are allowed!'), false);
        } else {
          cb(null, true);
        }
      },
      limits: { fileSize: 5 * 1024 * 1024 },
    }),
  )
  async uploadItemVariationImages(
    @UploadedFiles() files: { images?: Express.Multer.File[] },
  ) {
    const urls = files.images?.map(file => `/item-variation-images/${file.filename}`) || [];
    return { images: urls };
  }
}
