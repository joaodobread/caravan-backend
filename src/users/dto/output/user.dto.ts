import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';
import { BaseDto } from '~/common/dto/output/base.dto';

export class UserDto extends BaseDto {
  @Expose()
  @ApiProperty({ type: String, example: 'John' })
  firstName: string;

  @Expose()
  @ApiProperty({ type: String, example: 'Doe' })
  lastName: string;

  @Expose()
  @ApiProperty({ type: String, example: '29292929' })
  universityRegistration: string;

  @Expose()
  @ApiProperty({ type: String, example: 'john-doe-21' })
  username: string;

  @Expose()
  @ApiProperty({ type: Number, example: 4.5 })
  ratingTotal: number;
}
