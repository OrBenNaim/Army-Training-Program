import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';
import { ToDoListRepositoryInterface, TODOLIST_REPOSITORY } from 'src/todos/infrastructure/repositories/toDoList.repository-interface';
import { SignInCommand } from '../commands/sign-in.command';
import { ToDoItemEntity } from 'src/todos/domain/entity/ToDoItem.interface';


@CommandHandler(SignInCommand)
export class SignInHandler implements ICommandHandler<SignInCommand> {
  constructor(
    @Inject(TODOLIST_REPOSITORY) private readonly toDoListRepository: ToDoListRepositoryInterface,
  ) {}

  async execute(command: SignInCommand): Promise<ToDoItemEntity> {
    const { signInDto } = command;
    return await this.toDoListRepository.createToDoItem(signInDto);
  }
}