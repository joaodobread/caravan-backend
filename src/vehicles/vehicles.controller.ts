import { Body, Controller, Post } from '@nestjs/common';
import { ApiCreatedResponse, ApiTags } from '@nestjs/swagger';
import { CurrentUser } from '~/auth/decorators/current-user.decorator';
import { DecodedToken } from '~/auth/types/decoded-token.type';
import { Authenticated } from '~/common/decorators/authenticated.decorator';
import { CreateVehicleDto } from '~/vehicles/dto/input/create-vehicle.dto';
import { VehicleDto } from '~/vehicles/dto/output/vehicle.dto';
import { VehiclesService } from '~/vehicles/vehicles.service';

@Controller('vehicles')
@ApiTags('Vehicles')
export class VehiclesController {
  constructor(private readonly vehiclesService: VehiclesService) {}

  @Post()
  @ApiCreatedResponse({ type: VehicleDto })
  @Authenticated()
  async create(
    @Body() payload: CreateVehicleDto,
    @CurrentUser() currentUser: DecodedToken,
  ) {
    const vehicle = await this.vehiclesService.create({ currentUser, payload });
    return VehicleDto.factory(VehicleDto, vehicle);
  }
}
