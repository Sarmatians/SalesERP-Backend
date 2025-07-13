/* eslint-disable prettier/prettier */
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { ValidationPipe } from '@nestjs/common';
import { GlobalHttpExceptionFilter } from './utility/filter/http-exception.filter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Enable CORS 
  app.enableCors({
    origin: [
    'http://localhost:5173',
    'https://inventory-management-system-dinajpu-pi.vercel.app',
    ],
    credentials: true,
  });

  const config = new DocumentBuilder()
    .setTitle('Ecommerce API Documentation')
    .setDescription('')
    .setVersion('1.0')
    .addTag('ecommerce')
    .build();
  const documentFactory = () => SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('doc', app, documentFactory);

  app.setGlobalPrefix('api/v1');
  app.useGlobalPipes(
  new ValidationPipe({
    transform: true,
    whitelist: true,
    forbidNonWhitelisted: false,
  }),
);
  app.useGlobalFilters(new GlobalHttpExceptionFilter());
  await app.listen(process.env.PORT ?? 3333);
}
bootstrap();
