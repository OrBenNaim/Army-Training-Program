import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';
import { ToDoItemEntity } from 'src/todos/domain/entity/ToDoItem.entity';
import { GetAllToDoItemsQuery } from 'src/todos/application/queries/get-all-ToDo-items.query';
import { ToDoListRepository, TODOLIST_REPOSITORY} from 'src/todos/infrastructure/repositories/ToDoList-repository-interface';

@QueryHandler(GetAllToDoItemsQuery)
export class GetAllToDoItemsHandler implements IQueryHandler<GetAllToDoItemsQuery> {
  constructor(@Inject(TODOLIST_REPOSITORY) private readonly toDoListRepository: ToDoListRepository) {}

  async execute(): Promise<ToDoItemEntity[]> {
    return await this.toDoListRepository.getAllToDoItems();
  }
}
