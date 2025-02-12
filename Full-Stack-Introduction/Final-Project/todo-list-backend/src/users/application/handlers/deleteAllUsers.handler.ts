import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';
import { DeleteAllUsersCommand } from '../commands/deleteAllUsers.command';
import { UsersRepositoryInterface, USERS_REPOSITORY } from 'src/users/infrastructure/repository/users.repository-interface';  


@CommandHandler(DeleteAllUsersCommand)
export class DeleteAllUsersHandler implements ICommandHandler<DeleteAllUsersCommand> {
  constructor(@Inject(USERS_REPOSITORY) private readonly usersRepository: UsersRepositoryInterface) {}

  async execute(command: DeleteAllUsersCommand): Promise<void> {
    return await this.usersRepository.deleteAllUsers();
  }
}