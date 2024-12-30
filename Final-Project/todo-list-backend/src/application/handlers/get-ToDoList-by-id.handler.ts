import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { Inject, NotFoundException } from '@nestjs/common';
import { ToDoListEntity } from 'src/domain/entities/ToDoList.entity';
import { GetToDoListByIdQuery } from 'src/application/queries/get-ToDoList-by-id.query';
import { ToDoListRepository, TODOLIST_REPOSITORY} from 'src/infrastructure/repositories/ToDoList-repository-interface';

@QueryHandler(GetToDoListByIdQuery)
export class GetToDoListByIdHandler implements IQueryHandler<GetToDoListByIdQuery> {
  constructor(@Inject(TODOLIST_REPOSITORY) private readonly toDoListRepository: ToDoListRepository) {}

  async execute(query: GetToDoListByIdQuery): Promise<ToDoListEntity> {
    const {id} = query;
    return this.toDoListRepository.getToDoListById(id);
  }
}
