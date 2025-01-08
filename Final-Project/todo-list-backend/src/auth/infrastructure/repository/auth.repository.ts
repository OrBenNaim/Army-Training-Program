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
        
        // Find the user (if exists) by his username and password.
        const existingUser = await this.database
        .select()
        .from(usersTable)
        .where(eq(usersTable.username, signInDto.username))
        .execute()
        .then(users => users[0])

        if (existingUser && await argon.verify(existingUser.password, signInDto.password)) {
            // Authentication successful
            console.log("\nuser is already exists\n");
            return {
                userId: existingUser.id,
                username: existingUser.username,
                createdAt: existingUser.createdAt,
            }
        }  

        if (existingUser)
        
        console.log("\nuser is not inside DB yet\n");
        // The given user is not in db yet, add him.
        
        // Hash the password.
        const hashedPassword = await argon.hash(signInDto.password);

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

    
}