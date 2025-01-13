import { Injectable, Inject, NotFoundException, ConflictException, UnauthorizedException } from '@nestjs/common';
import { UsersRepositoryInterface } from './users.repository-interface';
import * as schema from 'src/database/schemas/todos';
import { usersTable } from 'src/database/schemas/users';
import { DATABASE_CONNECTION } from 'src/database/db-connection';
import { NodePgDatabase } from 'drizzle-orm/node-postgres';
import { and, eq, not } from 'drizzle-orm';
import { ConfigService } from '@nestjs/config';
import { UpdateUserDto, UserResponseDto } from 'src/users/application/dto/user.dto';
import * as argon from 'argon2';
import { UserEntity } from 'src/users/domain/entity/user.interface';


@Injectable()
export class UsersRepository implements UsersRepositoryInterface {
    constructor(
    @Inject(DATABASE_CONNECTION) private readonly database: NodePgDatabase<typeof schema>,
        private readonly configService: ConfigService
    ) {}


    async getUserByName(username: string, password: string): Promise<UserEntity>{
        try {
            
            // Find user (if exists) by his username.
            const matchedUser = await this.database
            .select()
            .from(usersTable)
            .where(eq(usersTable.username, username))
            .execute()
            .then(users => users[0]);

            if (!matchedUser)
            {
                return null;
            }
            
            return matchedUser;
        }
        catch(error) {
            console.log(error);
            return error;
        }
    }
    

    async getAllUsers(): Promise<UserResponseDto[]>{
        try{
            const allUsers = await this.database
            .select()
            .from(usersTable)
            .execute();

            // For each user, returns all his properties except 'password'
            return allUsers.map(user => {
                const {id, username, createdAt} = user;
                return {
                    userId: id,
                    username: username,
                    createdAt: createdAt,
                };
            });
        }
        catch(error) {
            console.log(error);
            return error;
        }
    }


    async deleteUser(userId: number): Promise<void> {
        const deletedUser = await this.database
        .delete(usersTable)
        .where(eq(usersTable.id, userId))
        .execute()
        .then(users => users[0]);

        if (!deletedUser)
        {
            throw new NotFoundException(`User with UserId=${userId} is not found.`).getResponse();
        }
    }


    async deleteAllUsers(): Promise<void> {
        await this.database.delete(usersTable).execute();
    }


    // async updateUser(userId: number, updateUserDto: UpdateUserDto): Promise<UserResponseDto>{
        
    //     // Check if user with updateUserDto.userId is exists
    //     const user = await this.getUserByName(userId);
        
    //     // Check if there is another user then updeatedUser with the same username.
    //     // If so, throw an error.
    //     const matchedUsers = await this.database
    //     .select()
    //     .from(usersTable)
    //     .where(and(
    //         eq(usersTable.username, updateUserDto.username), 
    //         not(eq(usersTable.id, userId))
    //     ))
    //     .execute();
    
    //     if (matchedUsers.length) {
    //         throw new ConflictException(`user with username '${updateUserDto.username}' is already exists.`);
    //     }

    //     // If updateUserDto.username is not null or undefined,
    //     // then updatedUsername will take the value of updateUserDto.username.
    //     // Otherwise, updatedUsername will fall back to the value of user.username
    //     const updatedUsername = updateUserDto.username ?? user.username;
        
    //     const updatedPassword = 
    //     updateUserDto.password !== null ? await argon.hash(updateUserDto.password) : await this.database
    //     .select()
    //     .from(usersTable)
    //     .where(eq(usersTable.id, userId))
    //     .execute()
    //     .then(users => users[0].password);
    
    
    //     const updatedUser = await this.database.update(usersTable)
    //     .set({ username: updatedUsername, password: updatedPassword })
    //     .where(eq(usersTable.id, userId))
    //     .returning({
    //         userId: usersTable.id,
    //         username: usersTable.username,
    //         createdAt: usersTable.createdAt,
    //     })
    //     .execute()
    //     .then(users => users[0]);

    //     return updatedUser;
    // }

}