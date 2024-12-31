import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';
import { UpdateToDoItemByIdCommand } from '../commands/update-ToDo-item-by-id.command';
import { ToDoListRepository, TODOLIST_REPOSITORY } from 'src/infrastructure/repositories/ToDoList-repository-interface';
import { NotFoundException } from 'src/common/exceptions/not-found-.exception';


@CommandHandler(UpdateToDoItemByIdCommand)
export class UpdateToDoListByIdHandler implements ICommandHandler<UpdateToDoItemByIdCommand> {
  constructor(@Inject(TODOLIST_REPOSITORY) private readonly toDoListRepository: ToDoListRepository) {}

  async execute(command: UpdateToDoItemByIdCommand): Promise<string> {
    return await this.toDoListRepository.updateToDoItemById(command.id, command.title, command.description);
  }
}
