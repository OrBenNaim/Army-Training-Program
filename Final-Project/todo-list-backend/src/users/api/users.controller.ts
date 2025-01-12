import { Controller, Body, Get, Delete, Param, Put, ValidationPipe, UseGuards } from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { UpdateUserDto, UserResponseDto } from '../application/dto/user.dto';
import { GetAllUsersQuery, GetUserByNameQuery } from '../application/queries/user.queries';
import { DeleteAllUsersCommand } from '../application/commands/deleteAllUsers.command';
import { DeleteUserCommand } from '../application/commands/deleteUser.command';
import { UpdateUserCommand } from '../application/commands/updateUser.command';
import { JwtGuard } from 'src/auth/guard';
import { GetUser } from 'src/auth/decorator';
import { UserEntity } from '../domain/entity/user.interface';



@Controller('users')
export class UsersController {
    constructor(private readonly commandBus: CommandBus, private readonly queryBus: QueryBus) {}    
    
    @UseGuards(JwtGuard)
    @Get('me')
    async getUser(@GetUser() user: UserEntity) {
        console.log(user)
        return user;
    }


    @Get()
    async getAllUsers(): Promise<UserResponseDto[]> {
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