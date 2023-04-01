import { Module } from '@nestjs/common';
import { RidesService } from '~/rides/rides.service';

@Module({
  providers: [RidesService],
  exports: [RidesService],
})
export class RidesModule {}
