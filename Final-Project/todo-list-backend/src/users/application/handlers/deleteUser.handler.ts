import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';
import { DeleteUserCommand } from '../commands/deleteUser.command';
import { ToDosRepositoryInterface, TODOS_REPOSITORY } from 'src/todos/infrastructure/repositories/toDos.repository-interface';  // eslint-disable-line
import { NotFoundException } from 'src/common/exceptions/not-found-.exception';


@CommandHandler(DeleteUserCommand)
export class DeleteUserHandler implements ICommandHandler<DeleteUserCommand> {
  constructor(@Inject(TODOS_REPOSITORY) private readonly toDosRepository: ToDosRepositoryInterface) {}

  async execute(command: DeleteUserCommand): Promise<void> {
    await this.toDosRepository.deleteUser(command.id);
  }
}
