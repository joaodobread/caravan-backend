import { Column, Entity, Index, OneToMany } from 'typeorm';
import { BaseTypeOrmEntity } from '~/database/entities/base';
import { Vehicles } from '~/database/entities/vehicles';

@Index('pk__vehicle_types', ['id'], { unique: true })
@Entity('vehicle_types', { schema: 'public' })
export class VehicleTypes extends BaseTypeOrmEntity {
  @Column('character varying', { name: 'name', length: 300 })
  name: string;

  @Column('character varying', { name: 'slug', length: 300 })
  slug: string;

  @OneToMany(() => Vehicles, (vehicles) => vehicles.vehicleType)
  vehicles: Vehicles[];
}
