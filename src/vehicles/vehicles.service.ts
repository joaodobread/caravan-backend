import { ConflictException, Injectable } from '@nestjs/common';
import { randomUUID } from 'crypto';
import { DecodedToken } from '~/auth/types/decoded-token.type';
import { ExceptionMessages } from '~/common/exceptions/messages';
import { UsersRepository } from '~/database/repositories/users.repository';
import { VehiclesTypesRepository } from '~/database/repositories/vehicle-types.repository';
import { VehiclesRepository } from '~/database/repositories/vehicles.repository';
import { CreateVehicleDto } from '~/vehicles/dto/input/create-vehicle.dto';
import { VehicleTypesIds } from '~/vehicles/vehicle-types/enum/vehicle-types-ids.enum';

@Injectable()
export class VehiclesService {
  constructor(
    private readonly vehiclesRepository: VehiclesRepository,
    private readonly vehiclesTypesRepository: VehiclesTypesRepository,
    private readonly usersRepository: UsersRepository,
  ) {}

  async create(args: { payload: CreateVehicleDto; currentUser: DecodedToken }) {
    const vehicleType = await this.vehiclesTypesRepository.findOneBy({
      id: VehicleTypesIds[args.payload.vehicleType],
    });
    const user = await this.usersRepository.findOneBy({
      id: args.currentUser.id,
    });
    const vehicleWithLicensePlate = await this.vehiclesRepository.findOne({
      where: { licensePlate: args.payload.licensePlate },
    });
    if (vehicleWithLicensePlate)
      throw new ConflictException(
        ExceptionMessages.VEHICLE_WITH_LICENSE_PLATE_ALREADY_EXISTS,
      );
    const vehicle = await this.vehiclesRepository.save(
      this.vehiclesRepository.create({
        id: randomUUID(),
        color: args.payload.color,
        brand: args.payload.brand,
        owner: user,
        vehicleType,
        model: args.payload.model,
        licensePlate: args.payload.licensePlate,
      }),
    );
    return vehicle;
  }
}
