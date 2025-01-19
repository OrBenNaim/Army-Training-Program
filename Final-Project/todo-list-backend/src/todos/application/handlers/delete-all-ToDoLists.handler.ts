import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';
import { DeleteAllToDosPerUserCommand } from '../commands/delete-all-ToDo-items.command';
import { ToDosRepositoryInterface, TODOS_REPOSITORY } from 'src/todos/infrastructure/repositories/todos.repository-interface';  


@CommandHandler(DeleteAllToDosPerUserCommand)
export class DeleteAllToDosPerUserHandler implements ICommandHandler<DeleteAllToDosPerUserCommand> {
  constructor(@Inject(TODOS_REPOSITORY) private readonly toDosRepository: ToDosRepositoryInterface) {}

  async execute(command: DeleteAllToDosPerUserCommand): Promise<void> {
    const { userId } = command;
    return await this.toDosRepository.deleteAllToDosPerUser(userId);
  }
}