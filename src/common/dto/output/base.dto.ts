import { ApiHideProperty, ApiProperty } from '@nestjs/swagger';
import {
  ClassConstructor,
  Exclude,
  Expose,
  instanceToInstance,
  plainToClass,
} from 'class-transformer';

export class BaseDto {
  static locale: string;

  @Expose()
  @ApiProperty({
    type: String,
    example: '1727876c-4a7d-454d-9ced-ff28110133db',
  })
  id: string;

  @ApiHideProperty()
  @Exclude()
  alternativeid: number;

  @ApiHideProperty()
  @Exclude()
  createdDate: Date;

  @ApiHideProperty()
  @Exclude()
  updatedDate: Date;

  @ApiHideProperty()
  @Exclude()
  deletedDate: Date;

  public static factory<T, R>(
    ResponseDto: ClassConstructor<T>,
    plainResponseData: R,
  ): T {
    const updatedResponseData = plainToClass<T, R>(
      ResponseDto,
      plainResponseData,
      {
        ignoreDecorators: true,
      },
    );

    return instanceToInstance(updatedResponseData, {
      excludeExtraneousValues: true,
    });
  }
}
