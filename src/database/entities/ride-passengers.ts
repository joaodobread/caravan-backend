import { Entity, Index, JoinColumn, ManyToOne } from 'typeorm';
import { BaseTypeOrmEntity } from '~/database/entities/base';
import { Rides } from '~/database/entities/rides';
import { Users } from '~/database/entities/users';

@Index('pk__passengers', ['id'], { unique: true })
@Entity('ride_passengers', { schema: 'public' })
export class RidePassengers extends BaseTypeOrmEntity {
  @ManyToOne(() => Rides, (rides) => rides.ridePassengers, {
    onDelete: 'SET NULL',
    onUpdate: 'CASCADE',
  })
  @JoinColumn([{ name: 'id_rides', referencedColumnName: 'id' }])
  idRides: Rides;

  @ManyToOne(() => Users, (users) => users.ridePassengers, {
    onDelete: 'SET NULL',
    onUpdate: 'CASCADE',
  })
  @JoinColumn([{ name: 'id_users', referencedColumnName: 'id' }])
  idUsers: Users;
}
