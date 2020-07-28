import { NestFactory } from '@nestjs/core';
import { Logger } from '@nestjs/common';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import * as config from 'config';

import { AppModule } from './app.module';

async function bootstrap() {
    const logger = new Logger('bootstrap');
    const app = await NestFactory.create(AppModule);

    // Adding openAPI for RESTApi requests:
    const options = new DocumentBuilder()
        .addBearerAuth()
        .setTitle('API')
        .setDescription('API description')
        .setVersion('1.0')
        .build();
    const document = SwaggerModule.createDocument(app, options);
    SwaggerModule.setup('api', app, document);

    // Server configuration:
    if (process.env.NODE_ENV === 'development') {
        app.enableCors();
    }
    const serverConfig = config.get('server');
    const port = process.env.PORT || serverConfig.port;

    await app.listen(port);
    logger.log(`Application listening on port ${port}`);
}
bootstrap();
