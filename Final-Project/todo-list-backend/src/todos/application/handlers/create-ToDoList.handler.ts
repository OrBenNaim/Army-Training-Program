import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';
import { ToDosRepositoryInterface, TODOS_REPOSITORY } from 'src/todos/infrastructure/repositories/toDos.repository-interface';  // eslint-disable-line
import { CreateToDoItemCommand } from '../commands/create-ToDo-item.command';
import { ToDoEntity } from 'src/todos/domain/entity/ToDo.interface';


@CommandHandler(CreateToDoItemCommand)
export class CreateToDoItemHandler implements ICommandHandler<CreateToDoItemCommand> {
  constructor(
    @Inject(TODOS_REPOSITORY) private readonly toDosRepository: ToDosRepositoryInterface,
  ) {}

  async execute(command: CreateToDoItemCommand): Promise<ToDoEntity> {
    const { createToDoItemDto, userID } = command;
    return await this.toDosRepository.createToDoItem(createToDoItemDto, userID);
  }
}