import { Module } from '@nestjs/common';
import { VehiclesController } from '~/vehicles/vehicles.controller';
import { VehiclesService } from '~/vehicles/vehicles.service';

@Module({
  providers: [VehiclesService],
  controllers: [VehiclesController],
})
export class VehiclesModule {}
