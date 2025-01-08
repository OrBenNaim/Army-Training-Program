import { Controller, Post, Body, Get, Delete, Param, Put, ValidationPipe } from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { GetUserQuery } from '../application/queries/getUser.query';
import { UserResponseDto } from '../application/dto/user.dto';


@Controller('users')
export class UsersController {
    constructor(private readonly commandBus: CommandBus, private readonly queryBus: QueryBus) {}    
    
    @Get(':userId')
    async getUser(@Param('userId') userId: number): Promise<UserResponseDto> {
    
        try {
            return await this.queryBus.execute(new GetUserQuery(userId));
        }
        catch (error) {
            console.log(error);
            return error;
        }
    }
    
}