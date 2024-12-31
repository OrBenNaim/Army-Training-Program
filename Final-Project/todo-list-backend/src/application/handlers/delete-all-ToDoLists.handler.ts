import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';
import { DeleteAllToDoListsCommand } from '../commands/delete-all-ToDoLists.command';
import { ToDoListRepository, TODOLIST_REPOSITORY } from 'src/infrastructure/repositories/ToDoList-repository-interface';
import { NotFoundException } from 'src/common/exceptions/not-found-.exception';


@CommandHandler(DeleteAllToDoListsCommand)
export class DeleteAllToDoListsHandler implements ICommandHandler<DeleteAllToDoListsCommand> {
  constructor(@Inject(TODOLIST_REPOSITORY) private readonly toDoListRepository: ToDoListRepository) {}

  async execute(command: DeleteAllToDoListsCommand): Promise<string> {
    return await this.toDoListRepository.deleteAllToDoLists();
  }
}