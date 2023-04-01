import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { randomUUID } from 'crypto';
import { UsersRepository } from '~/database/repositories/users.repository';
import { CreateUserDto } from '~/users/dto/input/create-user.dto';
import { hash } from 'bcrypt';
import { ExceptionMessages } from '~/common/exceptions/messages';

@Injectable()
export class UsersService {
  private SALTS = 12;
  constructor(private readonly usersRepository: UsersRepository) {}

  async create(args: { payload: CreateUserDto }) {
    const hashedPassword = await hash(args.payload.password, this.SALTS);
    const issetUser = await this.usersRepository.findOneBy({
      username: args.payload.username,
    });
    if (issetUser)
      throw new ConflictException(ExceptionMessages.USER_ALREADY_EXISTS);
    const user = await this.usersRepository.save(
      this.usersRepository.create({
        id: randomUUID(),
        firstName: args.payload.firstName,
        lastName: args.payload.lastName,
        ratingCount: 0,
        ratingTotal: 0,
        universityRegistration: args.payload.universityRegistration,
        username: args.payload.username,
        password: hashedPassword,
      }),
    );
    return user;
  }

  async findOne(args: { id: string }) {
    const user = await this.usersRepository.findOneBy({ id: args.id });
    if (!user) throw new NotFoundException(ExceptionMessages.USER_NOT_FOUND);
    return user;
  }
}
