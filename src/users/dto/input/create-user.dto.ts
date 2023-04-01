import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, Matches } from 'class-validator';

export class CreateUserDto {
  @ApiProperty({ type: String, example: 'John' })
  @IsString()
  @IsNotEmpty()
  firstName: string;

  @ApiProperty({ type: String, example: 'Doe' })
  @IsString()
  @IsNotEmpty()
  lastName: string;

  @ApiProperty({ type: String, example: 'john-doe-21' })
  @IsString()
  @IsNotEmpty()
  username: string;

  @ApiProperty({ type: String, example: 'qwe123QWE' })
  @IsString()
  @IsNotEmpty()
  @Matches(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/, {
    message: 'weak password',
  })
  password: string;

  @ApiProperty({ type: String, example: '1239239' })
  @IsString()
  @IsNotEmpty()
  universityRegistration: string;
}
