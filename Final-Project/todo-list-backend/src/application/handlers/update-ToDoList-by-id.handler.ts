import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';
import { UpdateToDoListByIdCommand } from '../commands/update-ToDoList-by-id.command';
import { ToDoListRepository, TODOLIST_REPOSITORY } from 'src/infrastructure/repositories/ToDoList-repository-interface';
import { NotFoundException } from 'src/common/exceptions/not-found-.exception';


@CommandHandler(UpdateToDoListByIdCommand)
export class UpdateToDoListByIdHandler implements ICommandHandler<UpdateToDoListByIdCommand> {
  constructor(@Inject(TODOLIST_REPOSITORY) private readonly toDoListRepository: ToDoListRepository) {}

  async execute(command: UpdateToDoListByIdCommand): Promise<string> {
    return await this.toDoListRepository.updateToDoListById(command.id, command.title, command.description);
  }
}
