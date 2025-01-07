import { Injectable, Inject, NotFoundException, ConflictException } from '@nestjs/common';
import { AuthRepositoryInterface } from './Auth.repository-interface';
import { AuthEntity } from 'src/auth/domain/entity/Auth.interface';
import * as schema from 'src/database/schemas/todos';
import { usersTable } from 'src/database/schemas/users';
import { DATABASE_CONNECTION } from 'src/database/db-connection';
import { NodePgDatabase } from 'drizzle-orm/node-postgres';
import { and, eq } from 'drizzle-orm';
import { ConfigService } from '@nestjs/config';
import { SignInDto, SignInResponseDto } from 'src/auth/application/dto/sign-in.dto';
import * as argon from 'argon2';



@Injectable()
export class AuthRepository implements AuthRepositoryInterface {
    constructor(
    @Inject(DATABASE_CONNECTION) private readonly database: NodePgDatabase<typeof schema>,
        private readonly configService: ConfigService
    ) {}


    // Method to sign in a user.
    async signIn(signInDto: SignInDto): Promise<SignInResponseDto> {
        
        // Hash the password.
        const hashedPassword = await argon.hash(signInDto.password);
        
        // Find the user (if exists) by his username and password.
        const user = this.findUser(signInDto.username, hashedPassword);

        // If the user does not exist, add him to the users table. 
        if (!user){
            const new_user = {
                username: signInDto.username,
                password: hashedPassword,
                createdAt: new Date(),
            };

            // Save the user in the db
            const insertedUser = await this.database
            .insert(usersTable)
            .values(new_user)
            .returning({
                userId: usersTable.id,
                username: usersTable.username,
                createdAt: usersTable.createdAt,
            })
            .execute()
            .then(users => users[0]);

            return insertedUser; 
        }
        
        // If user exists, return the user entity.
        return user[0].returning({
            userId: usersTable.id,
            username: usersTable.username,
            createdAt: usersTable.createdAt,
        });
    }

    
    // Method to find a user by his username and password.
    async findUser(username: string, hashedPassword: string): Promise<AuthEntity> {
        const user = await this.database
        .select()
        .from(usersTable)
        .where(and(eq(usersTable.username, username), eq(usersTable.password, hashedPassword)))
        .execute()
        .then(users => users[0]);
        
        return user; 
    }
}