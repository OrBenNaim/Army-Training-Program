import { ToDoEntity } from 'src/todos/domain/entity/ToDo.interface';
import { ICommand } from '@nestjs/cqrs';

export class UpdateUserCommand implements ICommand {
    constructor(
        public userId: number,
        public username: string,
        public password: string,
        public createdAt: Date,
    ) {}
}