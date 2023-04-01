import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { AuthController } from '~/auth/auth.controller';
import { AuthService } from '~/auth/auth.service';
import { JwtStrategy } from '~/auth/strategy/jwt.strategy';

@Module({
  imports: [
    JwtModule.registerAsync({
      useFactory: async (configService: ConfigService) => {
        return {
          secret: configService.get('JWT_ACCESS_TOKEN_SECRET'),
          signOptions: {
            expiresIn: configService.get('JWT_ACCESS_TOKEN_EXPIRES_IN'),
            issuer: configService.get('JWT_ACCESS_TOKEN_ISSUER'),
          },
        };
      },
      inject: [ConfigService],
    }),
  ],
  providers: [AuthService, JwtStrategy],
  exports: [AuthService],
  controllers: [AuthController],
})
export class AuthModule {}
