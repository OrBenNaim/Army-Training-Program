import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';
import { DeleteToDoItemByIdCommand } from '../commands/delete-ToDo-item-by-id.command';
import { ToDosRepositoryInterface, TODOS_REPOSITORY } from 'src/todos/infrastructure/repositories/todods.repository-interface';  // eslint-disable-line
import { NotFoundException } from 'src/common/exceptions/not-found-.exception';


@CommandHandler(DeleteToDoItemByIdCommand)
export class DeleteToDoItemByIdHandler implements ICommandHandler<DeleteToDoItemByIdCommand> {
  constructor(@Inject(TODOS_REPOSITORY) private readonly toDosRepository: ToDosRepositoryInterface) {}

  async execute(command: DeleteToDoItemByIdCommand): Promise<void> {
    await this.toDosRepository.deleteToDoItemById(command.id);
  }
}
