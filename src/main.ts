import { Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { NestFastifyApplication } from '@nestjs/platform-fastify';
import { AppModule } from '~/app.module';
import { apiVersioningFactory } from '~/nestjs/factories/api-versioning.factory';
import { corsFactory } from '~/nestjs/factories/cors.factory';
import { fastifyAdapterFactory } from '~/nestjs/factories/fastify-adapter.factory';
import { fastifyCompressFactory } from '~/nestjs/factories/fastify-compress.factory';
import { fastifyHelmetFactory } from '~/nestjs/factories/fastify-helmet.factory';
import { fastifyMultipartFactory } from '~/nestjs/factories/fastify-multipart.factory';
import { swaggerFactory } from '~/nestjs/factories/swagger.factory';
import { usePipesFactory } from '~/nestjs/factories/use-pipes.factory';

async function bootstrap() {
  const fastifyAdapter = fastifyAdapterFactory();
  const app = await NestFactory.create<NestFastifyApplication>(
    AppModule,
    fastifyAdapter,
    {
      snapshot: true,
    },
  );

  usePipesFactory(app);
  corsFactory(app);
  apiVersioningFactory(app);
  await fastifyHelmetFactory(app);
  await fastifyMultipartFactory(app);
  await fastifyCompressFactory(app);
  swaggerFactory(app);

  const configService: ConfigService = app.get<ConfigService>(ConfigService);
  const httpPort = configService.getOrThrow<number>('PORT');
  await app
    .listen(httpPort)
    .then(async () =>
      Logger.log(
        `Application running at: ${await app.getUrl()}`,
        'ApplicationBootstrap',
      ),
    )
    .catch((reason: Error) =>
      Logger.log(reason.message, 'ApplicationBootstrap'),
    );
}
bootstrap();
