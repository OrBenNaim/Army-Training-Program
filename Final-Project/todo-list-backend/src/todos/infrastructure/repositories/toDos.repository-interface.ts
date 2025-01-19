
import { ToDoEntity } from '../../domain/entity/ToDo.interface';
import { CreateToDoItemDto, UpdateToDoItemDto } from 'src/todos/application/dto/todo.dto';

export const TODOS_REPOSITORY = 'TODOS_REPOSITORY';

export interface ToDosRepositoryInterface {
  createToDoItem(createToDoItemDto: CreateToDoItemDto, userId: number): Promise<ToDoEntity>;
  
  getAllToDoItems(): Promise<ToDoEntity[]>;

  getToDoItemById(id: number): Promise<ToDoEntity>;

  updateToDoItemById(id: number,  updateToDoItemDto: UpdateToDoItemDto): Promise<ToDoEntity>;
  
  deleteAllToDoItems(): Promise<void>;

  deleteToDoItemById(id: number): Promise<void>;
}
