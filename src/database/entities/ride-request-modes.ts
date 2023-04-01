import { Column, Entity, Index, OneToMany } from 'typeorm';
import { BaseTypeOrmEntity } from '~/database/entities/base';
import { Rides } from '~/database/entities/rides';

@Index('pk__ride_request_modes', ['id'], { unique: true })
@Entity('ride_request_modes', { schema: 'public' })
export class RideRequestModes extends BaseTypeOrmEntity {
  @Column('character varying', { name: 'name', length: 300 })
  name: string;

  @Column('character varying', { name: 'slug', length: 300 })
  slug: string;

  @OneToMany(() => Rides, (rides) => rides.idRideRequestModes)
  rides: Rides[];
}
