import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';
import { ToDoEntity } from 'src/todos/domain/entity/ToDo.interface';
import { GetAllToDosPerUserQuery } from 'src/todos/application/queries/getAllToDosPerUser.query';
import { ToDosRepositoryInterface, TODOS_REPOSITORY} from 'src/todos/infrastructure/repositories/todos.repository-interface';

@QueryHandler(GetAllToDosPerUserQuery)
export class GetAllToDoItemsHandler implements IQueryHandler<GetAllToDosPerUserQuery> {
  constructor(@Inject(TODOS_REPOSITORY) private readonly toDosRepository: ToDosRepositoryInterface) {}

  async execute(query: GetAllToDosPerUserQuery): Promise<ToDoEntity[]> {
    const { userId } = query;
    return await this.toDosRepository.getAllToDosPerUser(userId);
  }
}
