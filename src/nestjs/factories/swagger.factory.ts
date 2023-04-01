import { INestApplication } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import {
  DocumentBuilder,
  SwaggerDocumentOptions,
  SwaggerModule,
} from '@nestjs/swagger';

export function swaggerFactory(app: INestApplication) {
  const configService = app.get(ConfigService);
  const swaggerDocumentBuilder = new DocumentBuilder()
    .addBearerAuth()
    .setTitle(configService.get<string>('SYSTEM_TITLE'))
    .setDescription(configService.get<string>('SYSTEM_DESCRIPTION'))
    .setVersion(process.env.npm_package_version)
    .build();
  const swaggerDocumentOptions: SwaggerDocumentOptions = {
    operationIdFactory: (controllerKey: string, methodKey: string) =>
      `${controllerKey}_${methodKey}`,
  };
  const swaggerDocument = SwaggerModule.createDocument(
    app,
    swaggerDocumentBuilder,
    swaggerDocumentOptions,
  );

  SwaggerModule.setup('api', app, swaggerDocument);
  return {
    swaggerDocument,
  };
}
