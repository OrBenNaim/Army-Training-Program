import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';
import { ToDoItemEntity } from 'src/domain/entities/ToDoItem.entity';
import { GetAllToDoItemsQuery } from 'src/application/queries/get-all-ToDo-items.query';
import { ToDoListRepository, TODOLIST_REPOSITORY} from 'src/infrastructure/repositories/ToDoList-repository-interface';

@QueryHandler(GetAllToDoItemsQuery)
export class GetAllToDoItemsHandler implements IQueryHandler<GetAllToDoItemsQuery> {
  constructor(@Inject(TODOLIST_REPOSITORY) private readonly toDoListRepository: ToDoListRepository) {}

  async execute(): Promise<ToDoItemEntity[]> {
    return await this.toDoListRepository.getToDoLists();
  }
}
