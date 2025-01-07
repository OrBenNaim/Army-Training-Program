
import { AuthEntity } from 'src/auth/domain/entity/Auth.interface';
import { SignInDto } from 'src/auth/application/dto/sign-in.dto';

export const AUTH_REPOSITORY = 'AUTH_REPOSITORY';

export interface AuthRepositoryInterface {
  signIn(signInDto: SignInDto): Promise<AuthEntity>;

  findUserByUsername(username: string): Promise<AuthEntity>;
}
