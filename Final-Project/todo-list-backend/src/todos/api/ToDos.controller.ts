import { Controller, Post, Body, Get, Delete, Param, Put, InternalServerErrorException, UseGuards } from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { CreateToDoItemCommand } from '../application/commands/create-ToDo-item.command';
import { GetAllToDosPerUserQuery } from 'src/todos/application/queries/get-all-ToDo-items.query';
import { GetToDoItemByIdQuery } from 'src/todos/application/queries/get-ToDo-item-by-id.query';
import { UpdateToDoItemByIdCommand } from 'src/todos/application/commands/update-ToDo-item-by-id.command';
import { DeleteAllToDosPerUserCommand } from 'src/todos/application/commands/delete-all-ToDo-items.command';
import { DeleteToDoItemByIdCommand } from 'src/todos/application/commands/delete-ToDo-item-by-id.command';
import { CreateToDoItemDto, UpdateToDoItemDto } from 'src/todos/application/dto/todo.dto';
import { ToDoEntity } from 'src/todos/domain/entity/ToDo.interface';
import { JwtGuard } from 'src/auth/guard';
import { GetUser } from 'src/auth/decorator';


@UseGuards(JwtGuard)
@Controller('todos')
export class ToDosController {
  constructor(private readonly commandBus: CommandBus, private readonly queryBus: QueryBus) {}

  @Post()
  async createToDoList(@GetUser('id') userId: number, @Body() createToDoItemDto: CreateToDoItemDto): Promise<ToDoEntity> {
    
    try {
      return await this.commandBus.execute(new CreateToDoItemCommand(createToDoItemDto, userId));
    } 
    catch (error) {
      console.log(error);
      throw error;
    }
  }

  @Get()
  async getAllToDosPerUser(@GetUser('id') userId: number): Promise<ToDoEntity[]> {
    return await this.queryBus.execute(new GetAllToDosPerUserQuery(userId));
  }


  @Get(':id')
  async getToDoItemById(@Param('id') id: number): Promise<ToDoEntity> {
    return await this.queryBus.execute(new GetToDoItemByIdQuery(id));
  }


  @Put(':id')
  async updateToDoItemById(@Param('id') id: number, @Body() updateToDoItemDto: UpdateToDoItemDto): Promise<ToDoEntity> {
    return await this.commandBus.execute(new UpdateToDoItemByIdCommand(id, updateToDoItemDto));  
  }


  @Delete()
  async deleteAllToDosPerUser(@GetUser('id') userId: number): Promise<void> {
    await this.commandBus.execute(new DeleteAllToDosPerUserCommand(userId));
  }


  @Delete(':id')
  async deleteToDoItem(@Param('id') id: number): Promise<void> {
    await this.commandBus.execute(new DeleteToDoItemByIdCommand(id));
  }
}
