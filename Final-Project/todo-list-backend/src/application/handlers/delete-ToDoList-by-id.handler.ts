import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';
import { DeleteToDoListByIdCommand } from '../commands/delete-ToDoList-by-id.command';
import { ToDoListsRepository, TODOLIST_REPOSITORY } from 'src/infrastructure/repositories/ToDoList-repository-interface';
import { NotFoundException } from 'src/common/exceptions/not-found-.exception';


@CommandHandler(DeleteToDoListByIdCommand)
export class DeleteToDoListByIdHandler implements ICommandHandler<DeleteToDoListByIdCommand> {
  constructor(@Inject(TODOLIST_REPOSITORY) private readonly toDoListsRepository: ToDoListsRepository) {}

  async execute(command: DeleteToDoListByIdCommand): Promise<void> {
    await this.toDoListsRepository.deleteToDoListById(command.id);
  }
}
