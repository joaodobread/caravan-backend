import { UseGuards, applyDecorators } from '@nestjs/common';
import { ApiBearerAuth } from '@nestjs/swagger';
import { JwtAuthGuard } from '~/auth/guards/jwt-auth.guard';

export const Authenticated = () =>
  applyDecorators(ApiBearerAuth(), UseGuards(JwtAuthGuard));
