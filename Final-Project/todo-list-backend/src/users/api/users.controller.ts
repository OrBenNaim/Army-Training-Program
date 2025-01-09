import { Controller, Post, Body, Get, Delete, Param, Put, ValidationPipe } from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { GetUserQuery } from '../application/queries/getUser.query';
import { UpdateUserDto, UserResponseDto } from '../application/dto/user.dto';
import { GetAllUsersQuery } from '../application/queries/getAllUsers.query';
import { DeleteAllUsersCommand } from '../application/commands/deleteAllUsers.command';
import { DeleteUserCommand } from '../application/commands/deleteUser.command';
import { UpdateUserCommand } from '../application/commands/updateUser.command';


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


    @Get()
    async getAllUsers(): Promise<UserResponseDto> {
        return await this.queryBus.execute(new GetAllUsersQuery());
    }

    
    @Delete()
    async deleteAllUsers(): Promise<void> {
        await this.commandBus.execute(new DeleteAllUsersCommand());
    }


    @Delete(':id')
    async deleteUser(@Param('id') userId: number): Promise<void> {
        await this.commandBus.execute(new DeleteUserCommand(userId));
    }
    

    @Put(':id')
    async updateUser(
        @Param('id') userId: number, 
        @Body() updateUserDto: UpdateUserDto): Promise<UserResponseDto> { 
            
            return await this.commandBus.execute(new UpdateUserCommand(userId, updateUserDto));  
    }
}