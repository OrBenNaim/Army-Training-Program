import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { Inject, NotFoundException } from '@nestjs/common';
import { ToDoEntity } from 'src/todos/domain/entity/ToDo.interface';
import { GetUserQuery } from 'src/users/application/queries/getUser.query';
import { ToDosRepositoryInterface, TODOS_REPOSITORY} from 'src/todos/infrastructure/repositories/toDos.repository-interface';

@QueryHandler(GetUserQuery)
export class GetUserHandler implements IQueryHandler<GetUserQuery> {
  constructor(@Inject(TODOS_REPOSITORY) private readonly toDosRepository: ToDosRepositoryInterface) {}

  async execute(query: GetUserQuery): Promise<ToDoEntity> {
    const {id} = query;
    return this.toDosRepository.getUser(id);
  }
}
