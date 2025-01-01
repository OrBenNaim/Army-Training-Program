import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';
import { UpdateToDoItemByIdCommand } from '../commands/update-ToDo-item-by-id.command';
import { ToDoListRepositoryInterface, TODOLIST_REPOSITORY } from 'src/todos/infrastructure/repositories/toDoList.repository-interface';
import { NotFoundException } from 'src/common/exceptions/not-found-.exception';
import { ToDoItemEntity } from 'src/todos/domain/entity/ToDoItem.entity';


@CommandHandler(UpdateToDoItemByIdCommand)
export class UpdateToDoListByIdHandler implements ICommandHandler<UpdateToDoItemByIdCommand> {
  constructor(@Inject(TODOLIST_REPOSITORY) private readonly toDoListRepository: ToDoListRepositoryInterface) {}

  async execute(command: UpdateToDoItemByIdCommand): Promise<ToDoItemEntity> {
    return await this.toDoListRepository.updateToDoItemById(command.id, command.title, command.description, command.completed);
  }
}
