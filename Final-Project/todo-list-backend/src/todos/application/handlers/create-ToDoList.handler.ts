import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';
import { ToDoListRepositoryInterface, TODOLIST_REPOSITORY } from 'src/todos/infrastructure/repositories/toDoList.repository-interface';
import { CreateToDoItemCommand } from '../commands/create-ToDo-item.command';
import { ToDoItemEntity } from 'src/todos/domain/entity/ToDoItem.entity';


@CommandHandler(CreateToDoItemCommand)
export class CreateToDoItemHandler implements ICommandHandler<CreateToDoItemCommand> {
  constructor(
    @Inject(TODOLIST_REPOSITORY) private readonly toDoListRepository: ToDoListRepositoryInterface,
  ) {}

  async execute(command: CreateToDoItemCommand): Promise<ToDoItemEntity> {
    const { createToDoItemDto } = command;
    return await this.toDoListRepository.createToDoItem(createToDoItemDto);
  }
}