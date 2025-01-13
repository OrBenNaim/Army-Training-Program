import { AuthDto, SignInResponseDto } from 'src/auth/dto/auth.dto';

export const AUTH_REPOSITORY = 'AUTH_REPOSITORY';

export interface AuthRepositoryInterface {
  signIn(signInDto: AuthDto);
  
  insertUser(new_user: AuthDto);

  signToken(userId: number, username: string, createdAt: Date);
}
