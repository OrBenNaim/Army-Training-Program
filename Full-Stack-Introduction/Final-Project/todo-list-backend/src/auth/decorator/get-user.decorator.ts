import { createParamDecorator, ExecutionContext, UnauthorizedException, } from '@nestjs/common';
import { UserResponseDto } from 'src/users/application/dto/user.dto';
  

export const GetUser = createParamDecorator((data: keyof UserResponseDto | undefined, ctx: ExecutionContext) => {
  const request = ctx.switchToHttp().getRequest();
  const user = request.user;

  if (!user) {
    throw new UnauthorizedException('No user attached to request');
  }

  return data ? user[data] : user;
});
