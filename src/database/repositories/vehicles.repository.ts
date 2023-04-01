import { Inject, Injectable } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';
import { Vehicles } from '~/database/entities';
import { DatabaseProvidersSymbols } from '~/database/providers/provider.symbols';

@Injectable()
export class VehiclesRepository extends Repository<Vehicles> {
  constructor(
    @Inject(DatabaseProvidersSymbols.DATA_SOURCE)
    dataSource: DataSource,
  ) {
    super(Vehicles, dataSource.manager);
  }
}
