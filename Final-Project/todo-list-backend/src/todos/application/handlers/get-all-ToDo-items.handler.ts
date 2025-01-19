import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';
import { ToDoEntity } from 'src/todos/domain/entity/ToDo.interface';
import { GetAllToDoItemsQuery } from 'src/todos/application/queries/get-all-ToDo-items.query';
import { ToDosRepositoryInterface, TODOS_REPOSITORY} from 'src/todos/infrastructure/repositories/todos.repository-interface';

@QueryHandler(GetAllToDoItemsQuery)
export class GetAllToDoItemsHandler implements IQueryHandler<GetAllToDoItemsQuery> {
  constructor(@Inject(TODOS_REPOSITORY) private readonly toDosRepository: ToDosRepositoryInterface) {}

  async execute(): Promise<ToDoEntity[]> {
    return await this.toDosRepository.getAllToDoItems();
  }
}
