import { Inject, Injectable } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';
import { Users } from '~/database/entities';
import { DatabaseProvidersSymbols } from '~/database/providers/provider.symbols';

@Injectable()
export class UsersRepository extends Repository<Users> {
  constructor(
    @Inject(DatabaseProvidersSymbols.DATA_SOURCE)
    dataSource: DataSource,
  ) {
    super(Users, dataSource.manager);
  }
}
