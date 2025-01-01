import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';
import { ToDoListRepository, TODOLIST_REPOSITORY } from 'src/todos/infrastructure/repositories/ToDoList-repository-interface';
import { CreateToDoItemCommand } from '../commands/create-ToDo-item.command';


@CommandHandler(CreateToDoItemCommand)
export class CreateToDoItemHandler implements ICommandHandler<CreateToDoItemCommand> {
  constructor(
    @Inject(TODOLIST_REPOSITORY) private readonly toDoListRepository: ToDoListRepository,
  ) {}

  async execute(command: CreateToDoItemCommand): Promise<string> {
    const { toDoItem } = command;
    return await this.toDoListRepository.createToDoItem(toDoItem);
  }
}