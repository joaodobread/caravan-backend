import fastifyCompress from '@fastify/compress';
import { INestApplication } from '@nestjs/common';

export async function fastifyCompressFactory(app: INestApplication) {
  await app.getHttpAdapter().getInstance().register(fastifyCompress);
}
