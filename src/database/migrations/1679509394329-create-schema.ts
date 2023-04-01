import { MigrationInterface, QueryRunner } from 'typeorm';
import { SqlScriptPaths } from '~/database/migrations/constants/scripts-path';
import { FileHelper } from '~/database/migrations/helpers/handle-file.helper';

export class createSchema1679509394329 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    const createSchemaSql = FileHelper.read(SqlScriptPaths.CREATE_SCHEMA_UP);
    await queryRunner.query(createSchemaSql);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    const createSchemaSql = FileHelper.read(SqlScriptPaths.CREATE_SCHEMA_DOWN);
    await queryRunner.query(createSchemaSql);
  }
}
