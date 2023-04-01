import fastifyMultipart from '@fastify/multipart';
import { INestApplication } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

export async function fastifyMultipartFactory(app: INestApplication) {
  const configService = app.get(ConfigService);
  const fieldSize = configService.get<number>(
    'FASTIFY_LIMITS_FIELD_SIZE',
    1000000,
  );
  const fileSize = configService.get<number>('FASTIFY_LIMITS_FILE_SIZE', 100);
  await app
    .getHttpAdapter()
    .getInstance()
    .register(fastifyMultipart, {
      limits: {
        fieldNameSize: 1024, // Max field name size in bytes
        fieldSize, // Max field value size in bytes
        fields: 10, // Max number of non-file fields
        fileSize, // For multipart forms, the max file size
        files: 3, // Max number of file fields
        headerPairs: 2000, // Max number of header key=>value pairs
      },
    });
}
