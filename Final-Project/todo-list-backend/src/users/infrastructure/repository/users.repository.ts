import { Injectable, Inject, NotFoundException, ConflictException, UnauthorizedException } from '@nestjs/common';
import { UsersRepositoryInterface } from './users.repository-interface';
import * as schema from 'src/database/schemas/todos';
import { usersTable } from 'src/database/schemas/users';
import { DATABASE_CONNECTION } from 'src/database/db-connection';
import { NodePgDatabase } from 'drizzle-orm/node-postgres';
import { and, eq, not } from 'drizzle-orm';
import { UpdateUserDto, UserResponseDto } from 'src/users/application/dto/user.dto';
import * as argon from 'argon2';
import { UserEntity } from 'src/users/domain/entity/user.interface';
import { AuthDto } from 'src/auth/dto/auth.dto';


@Injectable()
export class UsersRepository implements UsersRepositoryInterface {
    constructor(
        @Inject(DATABASE_CONNECTION) private readonly database: NodePgDatabase<typeof schema>,
    ) {}

    async createNewUser(new_user: AuthDto): Promise<UserEntity>{
        
        // Hash the password.
        const hashedPassword = await argon.hash(new_user.password);
        new_user.password = hashedPassword;

        // Save the user in the db
        const insertedUser = await this.database
        .insert(usersTable)
        .values(new_user)
        .returning({
            id: usersTable.id,
            username: usersTable.username,
            password: usersTable.password,
            createdAt: usersTable.createdAt, 
        })
        .execute()
        .then(users => users[0]);
        
        return insertedUser;
    }


    async getUserByName(username: string): Promise<UserEntity>{
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
                    id: id,
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
        .returning({
            userId: usersTable.id,
            username: usersTable.username,
            createdAt: usersTable.createdAt,
        })
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


    async updateUser(user: UserEntity, updateUserDto: UpdateUserDto): Promise<UserResponseDto>{
        
        // Step 1: Check if there is another user with the same username
        const conflictingUser = await this.database
        .select()
        .from(usersTable)
        .where(and(
            eq(usersTable.username, updateUserDto.username), 
            not(eq(usersTable.id, user.id)) // Ensure it's not the same user being updated
        ))
        .execute()
        .then(users => users[0]);
    
        if (conflictingUser) {
            throw new ConflictException(`user with username '${updateUserDto.username}' is already exists.`);
        }

        // Step 2: Set the updated values (fall back to current values if not provided)
        const updatedUsername = updateUserDto.username ?? user.username;
        const updatedPassword = updateUserDto.password ?? user.password;

        // In case the username and password remain unchanged, 
        // restore the original user.
        
        if (updatedUsername === user.username && updatedPassword === user.password) {
            return {
                id: user.id,
                username: user.username,
                createdAt: user.createdAt
            }
        }
        
        // Step 3: Perform the update in the database
        const updatedUser = await this.database
        .update(usersTable)
        .set({ username: updatedUsername, password: updatedPassword })
        .where(eq(usersTable.id, user.id))
        .returning({
            id: usersTable.id,
            username: usersTable.username,
            createdAt: usersTable.createdAt,
        })
        .execute()
        .then(users => users[0])

        // Step 4: Return the updated user
        return updatedUser;
    }
}