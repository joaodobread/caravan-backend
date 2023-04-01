import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  OneToMany,
} from 'typeorm';
import { BaseTypeOrmEntity } from '~/database/entities/base';
import { RidePassengers } from '~/database/entities/ride-passengers';
import { RideRequestModes } from '~/database/entities/ride-request-modes';
import { RideTypes } from '~/database/entities/ride-types';
import { Users } from '~/database/entities/users';
import { Vehicles } from '~/database/entities/vehicles';

@Index('pk__rides', ['id'], { unique: true })
@Entity('rides', { schema: 'public' })
export class Rides extends BaseTypeOrmEntity {
  @Column('uuid', { primary: true, name: 'id' })
  @Column('timestamp with time zone', { name: 'start_at' })
  startAt: Date;

  @Column('double precision', { name: 'start_latitude', precision: 53 })
  startLatitude: number;

  @Column('double precision', { name: 'start_longitude', precision: 53 })
  startLongitude: number;

  @Column('double precision', { name: 'end_latitude', precision: 53 })
  endLatitude: number;

  @Column('double precision', { name: 'end_longitude', precision: 53 })
  endLongitude: number;

  @Column('smallint', { name: 'vacancies' })
  vacancies: number;

  @OneToMany(() => RidePassengers, (ridePassengers) => ridePassengers.idRides)
  ridePassengers: RidePassengers[];

  @ManyToOne(
    () => RideRequestModes,
    (rideRequestModes) => rideRequestModes.rides,
    { onDelete: 'SET NULL', onUpdate: 'CASCADE' },
  )
  @JoinColumn([{ name: 'id_ride_request_modes', referencedColumnName: 'id' }])
  idRideRequestModes: RideRequestModes;

  @ManyToOne(() => RideTypes, (rideTypes) => rideTypes.rides, {
    onDelete: 'SET NULL',
    onUpdate: 'CASCADE',
  })
  @JoinColumn([{ name: 'id_ride_types', referencedColumnName: 'id' }])
  idRideTypes: RideTypes;

  @ManyToOne(() => Users, (users) => users.rides, {
    onDelete: 'SET NULL',
    onUpdate: 'CASCADE',
  })
  @JoinColumn([{ name: 'id_users', referencedColumnName: 'id' }])
  idUsers: Users;

  @ManyToOne(() => Vehicles, (vehicles) => vehicles.rides, {
    onDelete: 'SET NULL',
    onUpdate: 'CASCADE',
  })
  @JoinColumn([{ name: 'id_vehicles', referencedColumnName: 'id' }])
  idVehicles: Vehicles;
}
