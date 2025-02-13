import { ToDoEntity } from 'src/todos/domain/entity/ToDo.interface';
import { ICommand } from '@nestjs/cqrs';
import { UpdateToDoItemDto } from '../dto/todo.dto';

export class UpdateToDoItemByIdCommand implements ICommand {
    constructor(
        public userId: number,
        public updateToDoItemDto: UpdateToDoItemDto,
    ) {}
}