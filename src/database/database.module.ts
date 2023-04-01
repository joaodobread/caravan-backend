import { Global, Module } from '@nestjs/common';
import { DataSourceProviderFactory } from '~/database/providers/data-source-factory.provider';
import { UsersRepository } from '~/database/repositories/users.repository';
import { VehiclesTypesRepository } from '~/database/repositories/vehicle-types.repository';
import { VehiclesRepository } from '~/database/repositories/vehicles.repository';

const providers = [
  DataSourceProviderFactory.register(),
  UsersRepository,
  VehiclesRepository,
  VehiclesTypesRepository,
];

@Global()
@Module({
  providers: [...providers],
  exports: [...providers],
})
export class DatabaseModule {}
