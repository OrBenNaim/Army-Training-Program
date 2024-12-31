import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';
import { DeleteToDoItemByIdCommand } from '../commands/delete-ToDo-item-by-id.command';
import { ToDoListRepository, TODOLIST_REPOSITORY } from 'src/infrastructure/repositories/ToDoList-repository-interface';
import { NotFoundException } from 'src/common/exceptions/not-found-.exception';


@CommandHandler(DeleteToDoItemByIdCommand)
export class DeleteToDoItemByIdHandler implements ICommandHandler<DeleteToDoItemByIdCommand> {
  constructor(@Inject(TODOLIST_REPOSITORY) private readonly toDoListRepository: ToDoListRepository) {}

  async execute(command: DeleteToDoItemByIdCommand): Promise<string> {
    return await this.toDoListRepository.deleteToDoItemById(command.id);
  }
}