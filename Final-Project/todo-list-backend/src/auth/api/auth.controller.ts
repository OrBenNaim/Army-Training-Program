import { Controller, Post, Body, Get, Delete, Param, Put, ValidationPipe } from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { SignInCommand } from 'src/auth/application/commands/sign-in.command';
import { SignInDto, SignInResponseDto } from 'src/auth/application/dto/sign-in.dto'; 


@Controller('auth')
export class AuthController {
    constructor(private readonly commandBus: CommandBus, private readonly queryBus: QueryBus) {}    
    
    @Post(':signin')
    async signIn(@Body() signInDto: SignInDto): Promise<SignInResponseDto> {
        
        console.log("\nInside signIn controller\n")
        try {
            return await this.commandBus.execute(new SignInCommand(signInDto));
        }
        catch (error) {
            console.log(error);
            return error;
        }
    }
}

    