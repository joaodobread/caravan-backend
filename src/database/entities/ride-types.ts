import { Column, Entity, Index, OneToMany } from 'typeorm';
import { BaseTypeOrmEntity } from '~/database/entities/base';
import { Rides } from '~/database/entities/rides';

@Index('pk__ride_types', ['id'], { unique: true })
@Index('idx__uq__name', ['name'], {})
@Entity('ride_types', { schema: 'public' })
export class RideTypes extends BaseTypeOrmEntity {
  @Column('character varying', { name: 'name', length: 300 })
  name: string;

  @Column('character varying', { name: 'slug', length: 300 })
  slug: string;

  @Column('character varying', {
    name: 'description',
    nullable: true,
    length: 500,
  })
  description: string | null;

  @OneToMany(() => Rides, (rides) => rides.idRideTypes)
  rides: Rides[];
}
