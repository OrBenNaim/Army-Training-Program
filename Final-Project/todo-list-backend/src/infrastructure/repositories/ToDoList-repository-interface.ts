import { ToDoListEntity } from '../../domain/entities/ToDoList.entity';

export const TODOLIST_REPOSITORY = 'TODOLIST_REPOSITORY';

export interface ToDoListRepository {
  createToDoList(toDoList: ToDoListEntity): Promise<string>;
  
  getToDoLists(): Promise<ToDoListEntity[]>;

  getToDoListById(id: number): Promise<ToDoListEntity>;

  updateToDoListById(id: number, title: string, description: string): Promise<string>;
  
  deleteAllToDoLists(): Promise<string>;

  deleteToDoListById(id: number): Promise<string>;
}
