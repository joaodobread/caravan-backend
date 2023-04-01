import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { compare } from 'bcrypt';
import { SignInDto } from '~/auth/dto/input/sign-in.dto';
import { ExceptionMessages } from '~/common/exceptions/messages';
import { UsersRepository } from '~/database/repositories/users.repository';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersRepository: UsersRepository,
    private readonly jwtService: JwtService,
  ) {}

  async signIn(args: { payload: SignInDto }) {
    const user = await this.usersRepository
      .createQueryBuilder('users')
      .where('users.username = :username', {
        username: args.payload.usernameOrUniversityRegistration,
      })
      .orWhere('users.universityRegistration = :universityRegistration', {
        universityRegistration: args.payload.usernameOrUniversityRegistration,
      })
      .getOne();
    if (!user)
      throw new UnauthorizedException(ExceptionMessages.INVALID_CREDENTIALS);
    const isValidPassword = await compare(args.payload.password, user.password);
    if (!isValidPassword)
      throw new UnauthorizedException(ExceptionMessages.INVALID_CREDENTIALS);
    const accessToken = this.jwtService.sign(
      {
        universityRegistration: user.universityRegistration,
        username: user.username,
      },
      { subject: user.id },
    );
    return {
      accessToken,
    };
  }
}
