import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';
import { UpdateUserCommand } from 'src/users/application/commands/updateUser.command';
import { ToDosRepositoryInterface, TODOS_REPOSITORY } from 'src/todos/infrastructure/repositories/toDos.repository-interface';
import { NotFoundException } from 'src/common/exceptions/not-found-.exception';
import { ToDoEntity } from 'src/todos/domain/entity/ToDo.interface';


@CommandHandler(UpdateUserCommand)
export class UpdateUserHandler implements ICommandHandler<UpdateUserCommand> {
  constructor(@Inject(TODOS_REPOSITORY) private readonly toDosRepository: ToDosRepositoryInterface) {}

  async execute(command: UpdateUserCommand): Promise<ToDoEntity> {
    return await this.toDosRepository.updateUser(command.id, command.title, command.description, command.completed);
  }
}
