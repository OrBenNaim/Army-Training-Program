import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';
import { DeleteUserCommand } from '../commands/deleteUser.command';
import { UsersRepositoryInterface, USERS_REPOSITORY } from 'src/users/infrastructure/repository/users.repository-interface';  // eslint-disable-line


@CommandHandler(DeleteUserCommand)
export class DeleteUserHandler implements ICommandHandler<DeleteUserCommand> {
  constructor(@Inject(USERS_REPOSITORY) private readonly usersRepository: UsersRepositoryInterface) {}

  async execute(command: DeleteUserCommand): Promise<void> {
    await this.usersRepository.deleteUser(command.id);
  }
}
