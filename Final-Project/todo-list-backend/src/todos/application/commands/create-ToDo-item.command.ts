import { CreateToDoItemDto } from 'src/todos/application/dto/create-ToDo-item.dto';  
import { ICommand } from '@nestjs/cqrs';

export class CreateToDoItemCommand implements ICommand {    
    constructor(
        public readonly createToDoItemDto: CreateToDoItemDto,
        public readonly userID: number,
    ) {}
} 
  