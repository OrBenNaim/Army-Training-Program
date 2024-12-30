import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { Inject, NotFoundException } from '@nestjs/common';
import { ToDoListEntity } from 'src/domain/entities/ToDoList.entity';
import { GetToDoListByIdQuery } from 'src/application/queries/get-ToDoList-by-id.query';
import { ToDoListsRepository, TODOLIST_REPOSITORY} from 'src/infrastructure/repositories/ToDoList-repository-interface';

@QueryHandler(GetToDoListByIdQuery)
export class GetToDoListByIdHandler implements IQueryHandler<GetToDoListByIdQuery> {
  constructor(@Inject(TODOLIST_REPOSITORY) private readonly blogRepository: ToDoListsRepository) {}

  async execute(query: GetToDoListByIdQuery): Promise<ToDoListEntity> {
    const {id} = query;
    return this.blogRepository.getToDoListById(id);
  }
}
