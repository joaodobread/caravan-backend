import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';
import { BaseDto } from '~/common/dto/output/base.dto';

export class SignInAccessTokenDto extends BaseDto {
  @ApiProperty({
    type: String,
    example:
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1bml2ZXJzaXR5UmVnaXN0cmF0aW9uIjoiMTIzIiwidXNlcm5hbWUiOiJqb2FvdmljdG9yIiwiaWF0IjoxNjc5ODAyNjQ1LCJleHAiOjE2Nzk4ODkwNDUsImlzcyI6ImNhcmF2YW4uYXBwIiwic3ViIjoiZGZjMjM1MWItM2Q1Ny00MGJjLTk0YjYtZTM0MmIyNjdmYmExIn0.7edtYYBLiWZ8CFFMsqzeQoDrKvqg4AuvlW7yDn28fM8',
  })
  @Expose()
  accessToken: string;
}
