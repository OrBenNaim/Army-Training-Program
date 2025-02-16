import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';
import { UpdateToDoItemByIdCommand } from '../commands/updateToDoItemById.command';
import { ToDosRepositoryInterface, TODOS_REPOSITORY } from 'src/todos/infrastructure/repositories/todods.repository-interface';  // eslint-disable-line
import { ToDoEntity } from 'src/todos/domain/entity/ToDo.interface';


@CommandHandler(UpdateToDoItemByIdCommand)
export class UpdateToDoListByIdHandler implements ICommandHandler<UpdateToDoItemByIdCommand> {
  constructor(@Inject(TODOS_REPOSITORY) private readonly toDosRepository: ToDosRepositoryInterface) {}

  async execute(command: UpdateToDoItemByIdCommand): Promise<ToDoEntity> {
    return await this.toDosRepository.updateToDoItemById(command.userId, command.updateToDoItemDto);
  }
}
