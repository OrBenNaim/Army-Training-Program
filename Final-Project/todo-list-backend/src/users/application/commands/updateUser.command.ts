import { ICommand } from '@nestjs/cqrs';
import { UpdateUserDto } from '../dto/user.dto';

export class UpdateUserCommand implements ICommand {
    constructor(
        public readonly userId: number,
        public readonly updateUserDto: UpdateUserDto
    ) {}
}