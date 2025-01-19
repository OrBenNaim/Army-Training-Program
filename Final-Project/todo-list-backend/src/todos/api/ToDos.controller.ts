import { Controller, Post, Body, Get, Delete, Param, Put, InternalServerErrorException, UseGuards } from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { CreateToDoItemCommand } from '../application/commands/create-ToDo-item.command';
import { GetAllToDoItemsQuery } from 'src/todos/application/queries/get-all-ToDo-items.query';
import { GetToDoItemByIdQuery } from 'src/todos/application/queries/get-ToDo-item-by-id.query';
import { UpdateToDoItemByIdCommand } from 'src/todos/application/commands/update-ToDo-item-by-id.command';
import { DeleteAllToDoItemsCommand } from 'src/todos/application/commands/delete-all-ToDo-items.command';
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
  async getAllToDoLists(): Promise<ToDoEntity[]> {
    return await this.queryBus.execute(new GetAllToDoItemsQuery());
  }


  @Get(':id')
  async getToDoListById(@Param('id') id: number): Promise<ToDoEntity> {
    return await this.queryBus.execute(new GetToDoItemByIdQuery(id));
  }


  @Put(':id')
  async updateToDoListById(@Param('id') id: number, @Body() updateToDoItemDto: UpdateToDoItemDto): Promise<ToDoEntity> {
    //const { title, description, completed  } = updateToDoItemDto; 
    return await this.commandBus.execute(new UpdateToDoItemByIdCommand(id, updateToDoItemDto));  
  }


  @Delete()
  async deleteAllToDoLists(): Promise<void> {
    await this.commandBus.execute(new DeleteAllToDoItemsCommand());
  }


  @Delete(':id')
  async deleteToDoList(@Param('id') id: number): Promise<void> {
    await this.commandBus.execute(new DeleteToDoItemByIdCommand(id));
  }

}
