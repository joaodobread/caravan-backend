import { INestApplication, VersioningType } from '@nestjs/common';

export function apiVersioningFactory(app: INestApplication) {
  app.enableVersioning({
    type: VersioningType.URI,
  });
}
