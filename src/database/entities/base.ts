import {
  BeforeInsert,
  BeforeUpdate,
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

export class BaseTypeOrmEntity {
  @Column('uuid', { primary: true, name: 'id' })
  id: string;

  @PrimaryGeneratedColumn({ type: 'bigint', name: 'alternative_id' })
  alternativeId: string;

  @CreateDateColumn({ name: 'created_date', type: 'timestamp with time zone' })
  createdDate: Date;

  @UpdateDateColumn({
    type: 'timestamp with time zone',
    name: 'updated_date',
    nullable: true,
  })
  updatedDate: Date | null;

  @DeleteDateColumn({
    type: 'timestamp with time zone',
    name: 'deleted_date',
    nullable: true,
  })
  deletedDate: Date | null;

  @BeforeInsert()
  protected setCreatedDate() {
    this.createdDate = new Date();
  }

  @BeforeUpdate()
  protected setUpdatedDate() {
    this.updatedDate = new Date();
  }
}
