import { Controller, Post, Body, Get, Delete, Param, Put, ValidationPipe } from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { SignInCommand } from '../application/commands/sign-in.command';
import { SignInDto } from '../application/dto/sign-in.dto'; 


@Controller('auth')
export class AuthController {
    constructor(private readonly commandBus: CommandBus, private readonly queryBus: QueryBus) {}
}

// @Post('signin')
// async signIn(@Body() signInDto: SignInDto): Promise<SignInResponseDto> {
//     return await this.commandBus.execute(new SignInCommand(SignInDto)),
// }