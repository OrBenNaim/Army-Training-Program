import { CreateToDoItemDto } from 'src/todos/application/dto/create-ToDo-item.dto';  
import { ICommand } from '@nestjs/cqrs';

// export class CreateToDoItemCommand {
//     constructor(public readonly toDoItem: ToDoItemEntity) {}
//   }

export class CreateToDoItemCommand {    
    constructor(public readonly createToDoItemDto: CreateToDoItemDto) {}
} 
  