import { UpdateUserDto, UserResponseDto } from "src/users/application/dto/user.dto";

export const USERS_REPOSITORY = 'USERS_REPOSITORY';

export interface UsersRepositoryInterface {
  getUser(userId: number): Promise<UserResponseDto>;
  
  getAllUsers(): Promise<UserResponseDto[]>;

  deleteUser(userId: number): Promise<void>;

  deleteAllUsers(): Promise<void>;

  updateUser(userId: number, updateUserDto: UpdateUserDto): Promise<UserResponseDto>;
}
