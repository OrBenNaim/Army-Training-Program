import { AuthDto } from "src/auth/dto/auth.dto";
import { UpdateUserDto, UserResponseDto } from "src/users/application/dto/user.dto";
import { UserEntity } from "src/users/domain/entity/user.interface";

export const USERS_REPOSITORY = 'USERS_REPOSITORY';

export interface UsersRepositoryInterface {
  createNewUser(new_user: AuthDto): Promise<UserEntity>;
  
  getUserByName(username: string): Promise<UserEntity>;
  
  getAllUsers(): Promise<UserResponseDto[]>;

  deleteUser(userId: number): Promise<void>;

  deleteAllUsers(): Promise<void>;

  //updateUser(userId: number, updateUserDto: UpdateUserDto): Promise<UserResponseDto>;
}
