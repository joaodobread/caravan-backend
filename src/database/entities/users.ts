import { Column, Entity, Index, OneToMany } from 'typeorm';
import { BaseTypeOrmEntity } from '~/database/entities/base';
import { RidePassengers } from '~/database/entities/ride-passengers';
import { Rides } from '~/database/entities/rides';
import { Vehicles } from '~/database/entities/vehicles';

@Index('idx__uq__users__username', ['deletedDate', 'username'], {})
@Index('pk__users', ['id'], { unique: true })
@Index('idx__part__uq__users__username', ['username'], { unique: true })
@Entity('users', { schema: 'public' })
export class Users extends BaseTypeOrmEntity {
  @Column('character varying', { name: 'first_name', length: 300 })
  firstName: string;

  @Column('character varying', { name: 'last_name', length: 300 })
  lastName: string;

  @Column('character varying', { name: 'university_registration', length: 50 })
  universityRegistration: string;

  @Column('character varying', { name: 'username', length: 300 })
  username: string;

  @Column('character varying', { name: 'password', length: 300 })
  password: string;

  @Column('integer', { name: 'rating_count', nullable: true })
  ratingCount: number | null;

  @Column('double precision', {
    name: 'rating_total',
    nullable: true,
    precision: 53,
  })
  ratingTotal: number | null;

  @OneToMany(() => RidePassengers, (ridePassengers) => ridePassengers.idUsers)
  ridePassengers: RidePassengers[];

  @OneToMany(() => Rides, (rides) => rides.idUsers)
  rides: Rides[];

  @OneToMany(() => Vehicles, (vehicles) => vehicles.owner)
  vehicles: Vehicles[];
}
