import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty, Matches } from 'class-validator';

export class SignInDto {
  @ApiProperty({ type: String, example: 'john-doe-21' })
  @IsString()
  @IsNotEmpty()
  usernameOrUniversityRegistration: string;

  @ApiProperty({ type: String, example: 'qwe123QWE' })
  @IsString()
  @IsNotEmpty()
  @Matches(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/, {
    message: 'weak password',
  })
  password: string;
}
