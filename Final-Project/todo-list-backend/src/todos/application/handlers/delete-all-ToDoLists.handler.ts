import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';
import { DeleteAllToDoItemsCommand } from '../commands/delete-all-ToDo-items.command';
import { ToDosRepositoryInterface, TODOS_REPOSITORY } from 'src/todos/infrastructure/repositories/toDos.repository-interface';  


@CommandHandler(DeleteAllToDoItemsCommand)
export class DeleteAllToDoItemsHandler implements ICommandHandler<DeleteAllToDoItemsCommand> {
  constructor(@Inject(TODOS_REPOSITORY) private readonly toDosRepository: ToDosRepositoryInterface) {}

  async execute(command: DeleteAllToDoItemsCommand): Promise<void> {
    return await this.toDosRepository.deleteAllToDoItems();
  }
}