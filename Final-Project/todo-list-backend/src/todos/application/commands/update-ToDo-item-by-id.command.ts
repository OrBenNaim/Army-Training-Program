import { ToDoItemEntity } from 'src/todos/domain/entity/ToDoItem.entity';
import { ICommand } from '@nestjs/cqrs';

export class UpdateToDoItemByIdCommand implements ICommand {
    constructor(
        public id: number,
        public title: string,
        public description: string,
        public completed: boolean
    ) {}
}