
import { ToDoEntity } from '../../domain/entity/ToDo.interface';
import { CreateToDoItemDto } from 'src/todos/application/dto/create-ToDo-item.dto';

export const TODOS_REPOSITORY = 'TODOS_REPOSITORY';

export interface ToDosRepositoryInterface {
  createToDoItem(createToDoItemDto: CreateToDoItemDto, userID: number): Promise<ToDoEntity>;
  
  getAllToDoItems(): Promise<ToDoEntity[]>;

  getToDoItemById(id: number): Promise<ToDoEntity>;

  updateToDoItemById(id: number, title: string, description: string, completed: boolean ): Promise<ToDoEntity>;
  
  deleteAllToDoItems(): Promise<void>;

  deleteToDoItemById(id: number): Promise<void>;
}
