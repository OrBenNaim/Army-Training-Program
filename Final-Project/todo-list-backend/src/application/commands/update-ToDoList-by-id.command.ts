import { ToDoListEntity } from 'src/domain/entities/ToDoList.entity';
import { ICommand } from '@nestjs/cqrs';

export class UpdateToDoListByIdCommand {
    constructor(
        public id: number,
        public title: string,
        public description: string) {}
}