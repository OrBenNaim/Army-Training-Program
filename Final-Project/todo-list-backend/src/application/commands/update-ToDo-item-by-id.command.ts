import { ToDoItemEntity } from 'src/domain/entities/ToDoItem.entity';
import { ICommand } from '@nestjs/cqrs';

export class UpdateToDoItemByIdCommand {
    constructor(
        public id: number,
        public title: string | null,
        public description: string | null,
        public completed: boolean | null
    ) {}
}