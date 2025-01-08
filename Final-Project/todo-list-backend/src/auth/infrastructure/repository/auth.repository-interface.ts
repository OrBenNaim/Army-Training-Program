
import { AuthEntity } from 'src/auth/domain/entity/auth.interface';
import { SignInDto, SignInResponseDto } from 'src/auth/application/dto/sign-in.dto';

export const AUTH_REPOSITORY = 'AUTH_REPOSITORY';

export interface AuthRepositoryInterface {
  signIn(signInDto: SignInDto): Promise<SignInResponseDto>;
  
  insertUser(new_user: SignInDto): Promise<SignInResponseDto>;
}
