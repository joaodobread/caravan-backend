import { Inject, Injectable } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';
import { VehicleTypes } from '~/database/entities';
import { DatabaseProvidersSymbols } from '~/database/providers/provider.symbols';

@Injectable()
export class VehiclesTypesRepository extends Repository<VehicleTypes> {
  constructor(
    @Inject(DatabaseProvidersSymbols.DATA_SOURCE)
    dataSource: DataSource,
  ) {
    super(VehicleTypes, dataSource.manager);
  }
}
