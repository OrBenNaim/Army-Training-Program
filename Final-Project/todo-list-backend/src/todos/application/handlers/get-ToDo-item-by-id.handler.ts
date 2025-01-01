import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { Inject, NotFoundException } from '@nestjs/common';
import { ToDoItemEntity } from 'src/todos/domain/entities/ToDoItem.entity';
import { GetToDoItemByIdQuery } from 'src/todos/application/queries/get-ToDo-item-by-id.query';
import { ToDoListRepository, TODOLIST_REPOSITORY} from 'src/todos/infrastructure/repositories/ToDoList-repository-interface';

@QueryHandler(GetToDoItemByIdQuery)
export class GetToDoItemByIdHandler implements IQueryHandler<GetToDoItemByIdQuery> {
  constructor(@Inject(TODOLIST_REPOSITORY) private readonly toDoListRepository: ToDoListRepository) {}

  async execute(query: GetToDoItemByIdQuery): Promise<ToDoItemEntity> {
    const {id} = query;
    return this.toDoListRepository.getToDoItemById(id);
  }
}
