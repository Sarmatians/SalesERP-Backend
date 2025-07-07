"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const app_module_1 = require("./app.module");
const swagger_1 = require("@nestjs/swagger");
const common_1 = require("@nestjs/common");
const http_exception_filter_1 = require("./utility/filter/http-exception.filter");
async function bootstrap() {
    const app = await core_1.NestFactory.create(app_module_1.AppModule);
    app.enableCors({
        origin: 'http://localhost:5173',
        credentials: true,
    });
    const config = new swagger_1.DocumentBuilder()
        .setTitle('Ecommerce API Documentation')
        .setDescription('')
        .setVersion('1.0')
        .addTag('ecommerce')
        .build();
    const documentFactory = () => swagger_1.SwaggerModule.createDocument(app, config);
    swagger_1.SwaggerModule.setup('doc', app, documentFactory);
    app.setGlobalPrefix('api/v1');
    app.useGlobalPipes(new common_1.ValidationPipe({
        transform: true,
        whitelist: true,
        forbidNonWhitelisted: false,
    }));
    app.useGlobalFilters(new http_exception_filter_1.GlobalHttpExceptionFilter());
    await app.listen(process.env.PORT ?? 3333);
}
bootstrap();
//# sourceMappingURL=main.js.map