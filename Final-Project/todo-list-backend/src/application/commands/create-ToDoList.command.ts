import { ToDoListEntity } from 'src/domain/entities/ToDoList.entity';
import { ICommand } from '@nestjs/cqrs';

export class CreateToDoListCommand {
    constructor(public readonly toDoList: ToDoListEntity) {}
  }
  