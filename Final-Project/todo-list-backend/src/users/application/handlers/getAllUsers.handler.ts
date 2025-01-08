import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';
import { ToDoEntity } from 'src/todos/domain/entity/ToDo.interface';
import { GetAllUsersQuery } from 'src/users/application/queries/getAllUsers.query';
import { ToDosRepositoryInterface, TODOS_REPOSITORY} from 'src/todos/infrastructure/repositories/toDos.repository-interface';

@QueryHandler(GetAllUsersQuery)
export class GetAllUsersHandler implements IQueryHandler<GetAllUsersQuery> {
  constructor(@Inject(TODOS_REPOSITORY) private readonly toDosRepository: ToDosRepositoryInterface) {}

  async execute(): Promise<ToDoEntity[]> {
    return await this.toDosRepository.getAllUsers();
  }
}
