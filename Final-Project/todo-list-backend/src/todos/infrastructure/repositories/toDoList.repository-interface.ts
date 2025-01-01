import { ToDoDbType } from 'src/todos/domain/entity/ToDoDb.type';
import { ToDoItemEntity } from '../../domain/entity/ToDoItem.entity';

export const TODOLIST_REPOSITORY = 'TODOLIST_REPOSITORY';

export interface ToDoListRepositoryInterface {
  createToDoItem(toDoList: ToDoItemEntity): Promise<ToDoDbType>;
  
  getAllToDoItems(): Promise<ToDoItemEntity[]>;

  getToDoItemById(id: number): Promise<ToDoItemEntity>;

  updateToDoItemById(id: number, title: string, description: string, completed: boolean | null): Promise<string>;
  
  deleteAllToDoItems(): Promise<string>;

  deleteToDoItemById(id: number): Promise<string>;
}
