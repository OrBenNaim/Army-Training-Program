import { Controller, Body, Get, Delete, Put, UseGuards } from '@nestjs/common';
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
    @Get('myUser')
    async getUser(@GetUser() user: UserEntity) {
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


    @UseGuards(JwtGuard)
    @Delete('myUser')
    async deleteUser(@GetUser('id') userId: number): Promise<void> {
        await this.commandBus.execute(new DeleteUserCommand(userId));
    }
    

    @UseGuards(JwtGuard)
    @Put('myUser')
    async updateUser(
        @GetUser() user: UserEntity, 
        @Body() updateUserDto: UpdateUserDto): Promise<UserResponseDto> { 

        return await this.commandBus.execute(new UpdateUserCommand(user, updateUserDto));  
    }
}