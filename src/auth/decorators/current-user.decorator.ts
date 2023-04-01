import { ExecutionContext, createParamDecorator } from '@nestjs/common';

export const CurrentUser = createParamDecorator(
  async (data, ctx: ExecutionContext): Promise<any> => {
    const req = ctx.switchToHttp().getRequest();
    return {
      id: req.user.sub,
      username: req.user.username,
      universityRegistration: req.user.universityRegistration,
    };
  },
);
