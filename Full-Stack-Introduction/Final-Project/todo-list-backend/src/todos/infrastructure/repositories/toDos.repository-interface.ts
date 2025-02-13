
import { ToDoEntity } from '../../domain/entity/ToDo.interface';
import { CreateToDoItemDto, UpdateToDoItemDto } from 'src/todos/application/dto/todo.dto';

export const TODOS_REPOSITORY = 'TODOS_REPOSITORY';

export interface ToDosRepositoryInterface {
  createToDoItem(createToDoItemDto: CreateToDoItemDto, userId: number): Promise<ToDoEntity>;
  
  getAllToDosPerUser(userId: number): Promise<ToDoEntity[]>; // Per userId

  getToDoItemById(id: number): Promise<ToDoEntity>;

  updateToDoItemById(userId: number, updateToDoItemDto: UpdateToDoItemDto): Promise<ToDoEntity>;
  
  deleteAllToDosPerUser(userId: number): Promise<void>; // Per userId

  deleteToDoItemById(id: number): Promise<void>;
}
