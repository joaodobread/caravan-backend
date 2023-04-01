import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  OneToMany,
} from 'typeorm';
import { BaseTypeOrmEntity } from '~/database/entities/base';
import { Rides } from '~/database/entities/rides';
import { Users } from '~/database/entities/users';
import { VehicleTypes } from '~/database/entities/vehicle-types';

@Index('pk__vehicles', ['id'], { unique: true })
@Entity('vehicles', { schema: 'public' })
export class Vehicles extends BaseTypeOrmEntity {
  @Column('character varying', { name: 'license_plate', length: 20 })
  licensePlate: string;

  @Column('character varying', { name: 'color', length: 300 })
  color: string;

  @Column('character varying', { name: 'model', length: 100 })
  model: string;

  @Column('character varying', { name: 'brand', length: 100 })
  brand: string;

  @OneToMany(() => Rides, (rides) => rides.idVehicles)
  rides: Rides[];

  @ManyToOne(() => Users, (users) => users.vehicles, {
    onDelete: 'SET NULL',
    onUpdate: 'CASCADE',
  })
  @JoinColumn([{ name: 'id_users', referencedColumnName: 'id' }])
  owner: Users;

  @ManyToOne(() => VehicleTypes, (vehicleTypes) => vehicleTypes.vehicles, {
    onDelete: 'SET NULL',
    onUpdate: 'CASCADE',
  })
  @JoinColumn([{ name: 'id_vehicle_types', referencedColumnName: 'id' }])
  vehicleType: VehicleTypes;
}
