import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';
import { DeleteToDoItemByIdCommand } from '../commands/delete-ToDo-item-by-id.command';
import { ToDoListRepositoryInterface, TODOLIST_REPOSITORY } from 'src/todos/infrastructure/repositories/toDoList.repository-interface';
import { NotFoundException } from 'src/common/exceptions/not-found-.exception';


@CommandHandler(DeleteToDoItemByIdCommand)
export class DeleteToDoItemByIdHandler implements ICommandHandler<DeleteToDoItemByIdCommand> {
  constructor(@Inject(TODOLIST_REPOSITORY) private readonly toDoListRepository: ToDoListRepositoryInterface) {}

  async execute(command: DeleteToDoItemByIdCommand): Promise<void> {
    await this.toDoListRepository.deleteToDoItemById(command.id);
  }
}
