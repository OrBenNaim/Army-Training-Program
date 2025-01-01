import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { Inject, NotFoundException } from '@nestjs/common';
import { ToDoItemEntity } from 'src/todos/domain/entity/ToDoItem.entity';
import { GetToDoItemByIdQuery } from 'src/todos/application/queries/get-ToDo-item-by-id.query';
import { ToDoListRepositoryInterface, TODOLIST_REPOSITORY} from 'src/todos/infrastructure/repositories/toDoList.repository-interface';

@QueryHandler(GetToDoItemByIdQuery)
export class GetToDoItemByIdHandler implements IQueryHandler<GetToDoItemByIdQuery> {
  constructor(@Inject(TODOLIST_REPOSITORY) private readonly toDoListRepository: ToDoListRepositoryInterface) {}

  async execute(query: GetToDoItemByIdQuery): Promise<ToDoItemEntity> {
    const {id} = query;
    return this.toDoListRepository.getToDoItemById(id);
  }
}
