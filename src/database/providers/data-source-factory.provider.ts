import { ConfigService } from '@nestjs/config';
import { DataSource, DataSourceOptions } from 'typeorm';
import { DatabaseProvidersSymbols } from '~/database/providers/provider.symbols';
import * as migrations from '../migrations';
import * as entities from '../entities';

export class DataSourceProviderFactory {
  static register() {
    return {
      provide: DatabaseProvidersSymbols.DATA_SOURCE,
      useFactory: async (configService: ConfigService) => {
        const dataSource = new DataSource(
          this.generateDataSourceOptions(configService),
        );
        return dataSource.initialize();
      },
      inject: [ConfigService],
    };
  }

  static generateDataSourceOptions(
    configService: ConfigService,
  ): DataSourceOptions {
    return {
      type: 'postgres',
      host: configService.getOrThrow('DB_HOST'),
      port: configService.getOrThrow<number>('DB_PORT'),
      username: configService.getOrThrow('DB_USER'),
      password: configService.getOrThrow('DB_PASS'),
      database: configService.getOrThrow('DB_NAME'),
      entities,
      migrations,
      synchronize: false,
      migrationsRun: false,
      logging: configService.get<string>('DB_LOGGING', 'false') === 'true',
    };
  }
}
