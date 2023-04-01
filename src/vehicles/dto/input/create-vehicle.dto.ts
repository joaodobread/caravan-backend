import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { IsEnum, IsNotEmpty, IsString } from 'class-validator';
import { VehicleTypesEnum } from '~/vehicles/vehicle-types/enum/vehicle-types-ids.enum';

export class CreateVehicleDto {
  @ApiProperty({ type: String, example: 'VOLKSWAGEN' })
  @IsNotEmpty()
  @IsString()
  @Transform(({ value }) => String(value).toUpperCase())
  brand: string;

  @ApiProperty({ type: String, example: 'JETTA' })
  @IsNotEmpty()
  @IsString()
  @Transform(({ value }) => String(value).toUpperCase())
  model: string;

  @ApiProperty({ type: String, example: 'PRETO' })
  @IsNotEmpty()
  @IsString()
  @Transform(({ value }) => String(value).toUpperCase())
  color: string;

  @ApiProperty({ type: String, example: 'BRA2E19' })
  @IsNotEmpty()
  @IsString()
  @Transform(({ value }) => String(value).toUpperCase())
  licensePlate: string;

  @ApiProperty({ enum: VehicleTypesEnum, example: VehicleTypesEnum.CAR })
  @IsNotEmpty()
  @IsEnum(VehicleTypesEnum)
  vehicleType: string;
}
