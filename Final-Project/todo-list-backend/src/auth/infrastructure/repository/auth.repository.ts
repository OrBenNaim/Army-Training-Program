import { Injectable, Inject, NotFoundException, ConflictException } from '@nestjs/common';
import { AuthRepositoryInterface } from './Auth.repository-interface';
import { AuthEntity } from 'src/auth/domain/entity/Auth.interface';
import * as schema from 'src/database/schemas/todos';
import { usersTable } from 'src/database/schemas/users';
import { DATABASE_CONNECTION } from 'src/database/db-connection';
import { NodePgDatabase } from 'drizzle-orm/node-postgres';
import { eq, not, and } from 'drizzle-orm';
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
        
        // Check if user is already exists by his username.
        const user = this.findUserByUsername(signInDto.username);

        // If user does not exist, add him to the users table. 
        if (!user){
            const hashedPassword = await argon.hash(signInDto.password);
            const new_user = {
                username: signInDto.username,
                password: hashedPassword,
            };

            // Save the user in the db
            const insertedUser = await this.database
            .insert(usersTable)
            .values(new_user)
            .returning({
                id: usersTable.id,
                username: usersTable.username,
            })
            .execute()
            .then(users => users[0]);

            return insertedUser;
        }
        
        // If user exists, return the user entity.
        return user;
    }

    async findUserByUsername(username: string): Promise<AuthEntity> {
        const user = await this.database
        .select()
        .from(usersTable)
        .where(eq(usersTable.username, username))
        .execute()
        .then(users => users[0]);

        return user;
    }
}