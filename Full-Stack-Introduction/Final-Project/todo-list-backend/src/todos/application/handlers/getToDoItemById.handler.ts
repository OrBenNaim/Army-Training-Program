import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';
import { ToDoEntity } from 'src/todos/domain/entity/ToDo.interface';
import { GetToDoItemByIdQuery } from 'src/todos/application/queries/getToDoItemById.query';
import { ToDosRepositoryInterface, TODOS_REPOSITORY } from 'src/todos/infrastructure/repositories/todods.repository-interface';

@QueryHandler(GetToDoItemByIdQuery)
export class GetToDoItemByIdHandler implements IQueryHandler<GetToDoItemByIdQuery> {
  constructor(@Inject(TODOS_REPOSITORY) private readonly toDosRepository: ToDosRepositoryInterface) {}

  async execute(query: GetToDoItemByIdQuery): Promise<ToDoEntity> {
    const {id} = query;
    return this.toDosRepository.getToDoItemById(id);
  }
}
