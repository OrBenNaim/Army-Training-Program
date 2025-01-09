import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';
import { UpdateUserCommand } from 'src/users/application/commands/updateUser.command';
import { UsersRepositoryInterface, USERS_REPOSITORY } from 'src/users/infrastructure/repository/users.repository-interface';
import { UserResponseDto } from '../dto/user.dto';


@CommandHandler(UpdateUserCommand)
export class UpdateUserHandler implements ICommandHandler<UpdateUserCommand> {
  constructor(@Inject(USERS_REPOSITORY) private readonly usersRepository: UsersRepositoryInterface) {}

  async execute(command: UpdateUserCommand): Promise<UserResponseDto> {
    const { userId, updateUserDto } = command;
    return await this.usersRepository.updateUser(userId, updateUserDto);
  }
}
