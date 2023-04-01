import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from '~/auth/auth.module';
import { DatabaseModule } from '~/database/database.module';
import { validateEnvironmentSchema } from '~/env/validate-environment';
import { RidesModule } from '~/rides/rides.module';
import { UsersModule } from '~/users/users.module';
import { VehiclesModule } from '~/vehicles/vehicles.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.env',
      isGlobal: true,
      load: [],
      validate: validateEnvironmentSchema,
    }),
    DatabaseModule,
    UsersModule,
    AuthModule,
    RidesModule,
    VehiclesModule,
  ],
})
export class AppModule {}
