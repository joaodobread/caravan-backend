import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';
import { BaseDto } from '~/common/dto/output/base.dto';

export class VehicleDto extends BaseDto {
  @ApiProperty({ type: String, example: 'BRA2E19' })
  @Expose()
  licensePlate: string;

  @ApiProperty({ type: String, example: 'PRETO' })
  @Expose()
  color: string;

  @ApiProperty({ type: String, example: 'JETTA' })
  @Expose()
  model: string;

  @ApiProperty({ type: String, example: 'VOLKSWAGEN' })
  @Expose()
  brand: string;
}
