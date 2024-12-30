import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';
import { ToDoListsRepository, TODOLIST_REPOSITORY } from 'src/infrastructure/repositories/ToDoList-repository-interface';
import { CreateToDoListCommand } from '../commands/create-ToDoList.command';


@CommandHandler(CreateToDoListCommand)
export class CreateToDoListHandler implements ICommandHandler<CreateToDoListCommand> {
  constructor(
    @Inject(TODOLIST_REPOSITORY) private readonly blogRepository: ToDoListsRepository,
  ) {}

  async execute(command: CreateToDoListCommand): Promise<void> {
    const { toDoList } = command;
    await this.blogRepository.createToDoList(toDoList);
  }
}