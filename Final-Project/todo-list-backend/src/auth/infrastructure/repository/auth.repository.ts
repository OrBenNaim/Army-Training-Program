import { Injectable, Inject, NotFoundException, ConflictException } from '@nestjs/common';
import { AuthRepositoryInterface } from './Auth.repository-interface';
import { AuthEntity } from 'src/auth/domain/entity/Auth.interface';
import * as schema from 'src/database/schemas/todos';
import { usersTable } from 'src/database/schemas/users';
import { DATABASE_CONNECTION } from 'src/database/db-connection';
import { NodePgDatabase } from 'drizzle-orm/node-postgres';
import { eq, not, and } from 'drizzle-orm';
import { ConfigService } from '@nestjs/config';
import { CreateToDoItemDto } from 'src/todos/application/dto/create-ToDo-item.dto';



@Injectable()
export class AuthRepository implements AuthRepositoryInterface {
    constructor(
    @Inject(DATABASE_CONNECTION) private readonly database: NodePgDatabase<typeof schema>,
        private readonly configService: ConfigService
    ) {}

    // Method to create a new ToDoItem
    async createToDoItem(createToDoItemDto: CreateToDoItemDto): Promise<AuthEntity> {
        return;
    }
}