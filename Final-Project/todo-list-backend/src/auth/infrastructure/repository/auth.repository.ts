import { Injectable, Inject, UnauthorizedException } from '@nestjs/common';
import { AuthRepositoryInterface } from './Auth.repository-interface';
import * as schema from 'src/database/schemas/todos';
import { usersTable } from 'src/database/schemas/users';
import { DATABASE_CONNECTION } from 'src/database/db-connection';
import { NodePgDatabase } from 'drizzle-orm/node-postgres';
import { eq } from 'drizzle-orm';
import { ConfigService } from '@nestjs/config';
import { SignInDto, SignInResponseDto } from 'src/auth/application/dto/sign-in.dto';
import * as argon from 'argon2';
import { JwtService } from '@nestjs/jwt';


@Injectable()
export class AuthRepository implements AuthRepositoryInterface {
    constructor(
    @Inject(DATABASE_CONNECTION) private readonly database: NodePgDatabase<typeof schema>,
        private readonly configService: ConfigService,
        private readonly jwt: JwtService
    ) {}


    // Method to sign in a user.
    async signIn(signInDto: SignInDto): Promise<SignInResponseDto> {
        
        // Find user (if exists) by his username.
        const existingUser = await this.database
        .select()
        .from(usersTable)
        .where(eq(usersTable.username, signInDto.username))
        .execute()
        .then(users => users[0]);
        
        // In case the given username does not exists inside the db -> Add him
        if (!existingUser) {
            console.log(`\nusername '${signInDto.username}' does not exist yet. Adding to database.`);

            return this.insertUser(signInDto);  // insertUser() returns SignInResponseDto object
        }
        
        // Otherwise, The given username already exists.
        // Check if the given password already exists too.
        // If so, just return the user.
        // If Not, throw an error.
        const pwMatches = await argon.verify(existingUser.password, signInDto.password);

        if(pwMatches) {
            // Password matches, return the user data
            return {
                userId: existingUser.id,
                username: existingUser.username,
                createdAt: existingUser.createdAt,
            }
        }  

        // The given username already exists but the given password not.
        // Throw an error.
        console.error(`Invalid password for username '${signInDto.username}'.`);
        throw new UnauthorizedException('Invalid username or password');
    }

    
    // Insert User to DB and return object from type SignInResponseDto
    async insertUser(new_user: SignInDto): Promise<SignInResponseDto>{
        // Hash the password.
        const hashedPassword = await argon.hash(new_user.password);
        new_user.password = hashedPassword

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


    async signToken(userId, username: string, password: string): Promise<{ access_token: string }> {
        const payload = {
            sub: userId,
            username,
            password
        };
        return this.jwt.signAsync(payload,)
    }
}