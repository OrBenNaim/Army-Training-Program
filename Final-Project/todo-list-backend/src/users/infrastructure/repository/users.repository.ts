import { Injectable, Inject, UnauthorizedException } from '@nestjs/common';
import { UsersRepositoryInterface } from './users.repository-interface';
import * as schema from 'src/database/schemas/todos';
import { usersTable } from 'src/database/schemas/users';
import { DATABASE_CONNECTION } from 'src/database/db-connection';
import { NodePgDatabase } from 'drizzle-orm/node-postgres';
import { and, eq } from 'drizzle-orm';
import { ConfigService } from '@nestjs/config';
import { UpdateUserDto, UserResponseDto } from 'src/users/application/dto/user.dto';


@Injectable()
export class UsersRepository implements UsersRepositoryInterface {
    constructor(
    @Inject(DATABASE_CONNECTION) private readonly database: NodePgDatabase<typeof schema>,
        private readonly configService: ConfigService
    ) {}


    async getUser(userId: number): Promise<UserResponseDto>{
        return
    }
      
    async getAllUsers(): Promise<UserResponseDto[]>{
        return
    }

    async deleteUser(userId: number): Promise<void> {
        await this.database.delete(usersTable).where(eq(usersTable.id, userId)).execute();
    }

    async deleteAllUsers(): Promise<void> {
        await this.database.delete(usersTable).execute();
    }

    async updateUser(updateUserDto: UpdateUserDto): Promise<UserResponseDto>{
        return
    }

}