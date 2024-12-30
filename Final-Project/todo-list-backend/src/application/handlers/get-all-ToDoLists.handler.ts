import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';
import { ToDoListEntity } from 'src/domain/entities/ToDoList.entity';
import { GetAllToDoListsQuery } from 'src/application/queries/get-all-ToDoLists.query';
import { ToDoListRepository, TODOLIST_REPOSITORY} from 'src/infrastructure/repositories/ToDoList-repository-interface';

@QueryHandler(GetAllToDoListsQuery)
export class GetAllToDoListsHandler implements IQueryHandler<GetAllToDoListsQuery> {
  constructor(@Inject(TODOLIST_REPOSITORY) private readonly toDoListRepository: ToDoListRepository) {}

  async execute(): Promise<ToDoListEntity[]> {
    return await this.toDoListRepository.getToDoLists();
  }
}
