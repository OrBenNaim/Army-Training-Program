import { ToDoItemEntity } from '../../domain/entities/ToDoItem.entity';

export const TODOLIST_REPOSITORY = 'TODOLIST_REPOSITORY';

export interface ToDoListRepository {
  createToDoItem(toDoList: ToDoItemEntity): Promise<string>;
  
  getAllToDoItems(): Promise<ToDoItemEntity[]>;

  getToDoItemById(id: number): Promise<ToDoItemEntity>;

  updateToDoItemById(id: number, title: string, description: string): Promise<string>;
  
  deleteAllToDoItems(): Promise<string>;

  deleteToDoItemById(id: number): Promise<string>;
}
