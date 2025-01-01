import { ToDoItemEntity } from 'src/todos/domain/entities/ToDoItem.entity';
import { ICommand } from '@nestjs/cqrs';

export class CreateToDoItemCommand {
    constructor(public readonly toDoItem: ToDoItemEntity) {}
  }
  