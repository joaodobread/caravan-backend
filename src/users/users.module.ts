import { Module } from '@nestjs/common';
import { UsersController } from '~/users/users.controller';
import { UsersService } from '~/users/users.service';

@Module({
  providers: [UsersService],
  controllers: [UsersController],
})
export class UsersModule {}
