import fastifyHelmet from '@fastify/helmet';
import { INestApplication } from '@nestjs/common';

export async function fastifyHelmetFactory(app: INestApplication) {
  await app
    .getHttpAdapter()
    .getInstance()
    .register(fastifyHelmet, {
      contentSecurityPolicy: {
        directives: {
          defaultSrc: [`'self'`],
          styleSrc: [`'self'`, `'unsafe-inline'`],
          imgSrc: [`'self'`, 'data:', 'validator.swagger.io'],
          scriptSrc: [`'self'`, `https: 'unsafe-inline'`],
        },
      },
    });
}
