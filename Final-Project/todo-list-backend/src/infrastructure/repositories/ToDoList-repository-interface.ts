import { ToDoListEntity } from '../../domain/entities/ToDoList.entity';

export const TODOLIST_REPOSITORY = 'TODOLIST_REPOSITORY';

export interface ToDoListRepository {
  createToDoList(toDoList: ToDoListEntity): Promise<void>;
  
  getToDoLists(): Promise<ToDoListEntity[]>;

  getToDoListById(id: number): Promise<ToDoListEntity>;
  
  deleteAllToDoLists(): Promise<void>;

  deleteToDoListById(id: number): Promise<void>;
}
