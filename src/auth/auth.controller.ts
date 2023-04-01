import { Body, Controller, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { AuthService } from '~/auth/auth.service';
import { SignInDto } from '~/auth/dto/input/sign-in.dto';
import { SignInAccessTokenDto } from '~/auth/dto/output/sign-in-token.dto';

@Controller('auth')
@ApiTags('Auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('sign-in')
  async signIn(@Body() payload: SignInDto) {
    const accessToken = await this.authService.signIn({ payload });
    return SignInAccessTokenDto.factory(SignInAccessTokenDto, accessToken);
  }
}
