import { ICommand } from '@nestjs/cqrs';
import { UpdateUserDto } from '../dto/user.dto';
import { UserEntity } from 'src/users/domain/entity/user.interface';


export class UpdateUserCommand implements ICommand {
    constructor(
        public readonly user: UserEntity,
        public readonly updateUserDto: UpdateUserDto
    ) {}
}