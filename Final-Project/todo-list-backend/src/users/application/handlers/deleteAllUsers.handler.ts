import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';
import { DeleteAllUsersCommand } from '../commands/deleteAllUsers.command';
import { ToDosRepositoryInterface, TODOS_REPOSITORY } from 'src/todos/infrastructure/repositories/toDos.repository-interface';  // eslint-disable-line


@CommandHandler(DeleteAllUsersCommand)
export class DeleteAllUsersHandler implements ICommandHandler<DeleteAllUsersCommand> {
  constructor(@Inject(TODOS_REPOSITORY) private readonly toDosRepository: ToDosRepositoryInterface) {}

  async execute(command: DeleteAllUsersCommand): Promise<void> {
    return await this.toDosRepository.deleteAllToDoItems();
  }
}