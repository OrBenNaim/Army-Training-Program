import { Injectable, UnauthorizedException, NotFoundException, ConflictException, Inject } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { AuthDto } from './dto/auth.dto';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { GetUserByNameQuery } from 'src/users/application/queries/user.queries';
import * as argon from 'argon2';
import { CreateNewUserCommand } from 'src/users/application/commands/createNewUser.command';
import { UserEntity } from 'src/users/domain/entity/user.interface';



@Injectable()
export class AuthService {
    constructor(
            private readonly configService: ConfigService,
            private readonly jwt: JwtService,
            private readonly commandBus: CommandBus,
            private readonly queryBus: QueryBus,
    ) {}

    // Method to sign-up a new user.
    async signUp(signUpDto: AuthDto) {
        
        try {
            const user = await this.queryBus.execute(new GetUserByNameQuery(signUpDto.username));

            // Check if the given username already exists in db
            if (user) {
                throw new ConflictException('Username already exists');
            } 

            // The user doesn't exist yet -> Create a new User
            const newUser: UserEntity = await this.commandBus.execute(new CreateNewUserCommand(signUpDto));

            return await this.signToken(newUser.id, newUser.username, newUser.createdAt);
        }
        catch (error){
            throw error;
        }
    }


    // Method to sign-in a user.
    async signIn(signInDto: AuthDto) {
        
        // Get user (if exists) by his username.
        const user: UserEntity = await this.queryBus.execute(new GetUserByNameQuery(signInDto.username));

        // Check if user not exists
        if (!user) {
            throw new NotFoundException(`User with username=${signInDto.username} is not found.`).getResponse();
        }
        
        // Otherwise, check if the given password matches to the username.
        // If so, just return the user's token.
        // If Not, throw an error.
        const pwMatches = await argon.verify(user.password, signInDto.password);

        if(pwMatches) {
            // Password matches, return the user token
            return await this.signToken(user.id, user.username, user.createdAt)
        }  

        // If we get here, It means that the given username already exists but the given password incorrect.
        // Throw an error.
        console.error(`Invalid password for username '${signInDto.username}'.`);
        throw new UnauthorizedException('Invalid username or password').getResponse();
    }


    async signToken(userId: number, username: string, createdAt: Date): Promise<{ access_token: string }> { 
        const payload = {
            sub: userId,
            username,
            createdAt,
        };

        const secret = this.configService.get('JWT_SECRET');
       
        const token = await this.jwt.signAsync(
            payload, 
            {
                expiresIn: '1d', // One day
                secret: secret, 
            },
        );

        return {
            access_token: token,
        };
    }
}