import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';
import { DeleteAllToDoListsCommand } from '../commands/delete-all-ToDoLists.command';
import { ToDoListsRepository, TODOLIST_REPOSITORY } from 'src/infrastructure/repositories/ToDoList-repository-interface';
import { NotFoundException } from 'src/common/exceptions/not-found-.exception';


@CommandHandler(DeleteAllToDoListsCommand)
export class DeleteAllToDoListsHandler implements ICommandHandler<DeleteAllToDoListsCommand> {
  constructor(@Inject(TODOLIST_REPOSITORY) private readonly blogRepository: ToDoListsRepository) {}

  async execute(command: DeleteAllToDoListsCommand): Promise<void> {
    await this.blogRepository.deleteAllToDoLists();
  }
}