
import { ToDoItemEntity } from '../../domain/entity/ToDoItem.entity';
import { CreateToDoItemDto } from 'src/todos/application/dto/create-ToDo-item.dto';

export const TODOLIST_REPOSITORY = 'TODOLIST_REPOSITORY';

export interface ToDoListRepositoryInterface {
  createToDoItem(createToDoItemDto: CreateToDoItemDto): Promise<ToDoItemEntity>;
  
  getAllToDoItems(): Promise<ToDoItemEntity[]>;

  getToDoItemById(id: number): Promise<ToDoItemEntity>;

  updateToDoItemById(id: number, title: string, description: string, completed: boolean ): Promise<ToDoItemEntity>;
  
  deleteAllToDoItems(): Promise<void>;

  deleteToDoItemById(id: number): Promise<void>;
}
