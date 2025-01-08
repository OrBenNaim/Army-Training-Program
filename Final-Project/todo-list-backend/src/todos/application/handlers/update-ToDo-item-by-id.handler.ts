import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';
import { UpdateToDoItemByIdCommand } from '../commands/update-ToDo-item-by-id.command';
import { ToDosRepositoryInterface, TODOS_REPOSITORY } from 'src/todos/infrastructure/repositories/toDos.repository-interface';
import { ToDoEntity } from 'src/todos/domain/entity/ToDo.interface';


@CommandHandler(UpdateToDoItemByIdCommand)
export class UpdateToDoListByIdHandler implements ICommandHandler<UpdateToDoItemByIdCommand> {
  constructor(@Inject(TODOS_REPOSITORY) private readonly toDosRepository: ToDosRepositoryInterface) {}

  async execute(command: UpdateToDoItemByIdCommand): Promise<ToDoEntity> {
    return await this.toDosRepository.updateToDoItemById(command.id, command.title, command.description, command.completed);
  }
}
