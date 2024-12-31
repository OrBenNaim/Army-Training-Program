import { ToDoItemEntity } from 'src/domain/entities/ToDoItem.entity';
import { ICommand } from '@nestjs/cqrs';

export class CreateToDoItemCommand {
    constructor(public readonly toDoItem: ToDoItemEntity) {}
  }
  