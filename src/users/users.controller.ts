import { Body, Controller, Get, Post } from '@nestjs/common';
import { ApiCreatedResponse, ApiTags } from '@nestjs/swagger';
import { Authenticated } from '~/common/decorators/authenticated.decorator';
import { CurrentUser } from '~/auth/decorators/current-user.decorator';
import { CreateUserDto } from '~/users/dto/input/create-user.dto';
import { UserDto } from '~/users/dto/output/user.dto';
import { UsersService } from '~/users/users.service';
import { DecodedToken } from '~/auth/types/decoded-token.type';

@Controller('users')
@ApiTags('Users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  @ApiCreatedResponse({ type: UserDto })
  async create(@Body() payload: CreateUserDto) {
    const user = await this.usersService.create({ payload });
    return UserDto.factory(UserDto, user);
  }

  @Get('me')
  @Authenticated()
  async me(@CurrentUser() currentUser: DecodedToken) {
    const user = await this.usersService.findOne(currentUser);
    return UserDto.factory(UserDto, user);
  }
}
