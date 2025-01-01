import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';
import { DeleteAllToDoItemsCommand } from '../commands/delete-all-ToDo-items.command';
import { ToDoListRepositoryInterface, TODOLIST_REPOSITORY } from 'src/todos/infrastructure/repositories/toDoList.repository-interface';
import { NotFoundException } from 'src/common/exceptions/not-found-.exception';
import { ToDoDbType } from 'src/todos/domain/entity/ToDoDb.type';
import { ToDoItemEntity } from 'src/todos/domain/entity/ToDoItem.entity';


@CommandHandler(DeleteAllToDoItemsCommand)
export class DeleteAllToDoItemsHandler implements ICommandHandler<DeleteAllToDoItemsCommand> {
  constructor(@Inject(TODOLIST_REPOSITORY) private readonly toDoListRepository: ToDoListRepositoryInterface) {}

  async execute(command: DeleteAllToDoItemsCommand): Promise<void> {
    return await this.toDoListRepository.deleteAllToDoItems();
  }
}