import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';
import { DeleteAllToDoItemsCommand } from '../commands/delete-all-ToDo-items.command';
import { ToDoListRepository, TODOLIST_REPOSITORY } from 'src/infrastructure/repositories/ToDoList-repository-interface';
import { NotFoundException } from 'src/common/exceptions/not-found-.exception';


@CommandHandler(DeleteAllToDoItemsCommand)
export class DeleteAllToDoItemsHandler implements ICommandHandler<DeleteAllToDoItemsCommand> {
  constructor(@Inject(TODOLIST_REPOSITORY) private readonly toDoListRepository: ToDoListRepository) {}

  async execute(command: DeleteAllToDoItemsCommand): Promise<string> {
    return await this.toDoListRepository.deleteAllToDoLists();
  }
}