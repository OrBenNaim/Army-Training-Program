import { ToDoItemEntity } from 'src/todos/domain/entity/ToDoItem.entity';
import { ICommand } from '@nestjs/cqrs';

export class CreateToDoItemCommand {
    constructor(public readonly toDoItem: ToDoItemEntity) {}
  }
  