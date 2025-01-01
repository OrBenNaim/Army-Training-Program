import { Controller, Post, Body, Get, Delete, Param, Put, ValidationPipe, UseInterceptors, ClassSerializerInterceptor, UsePipes } from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { CreateToDoItemCommand } from '../application/commands/create-ToDo-item.command';
import { GetAllToDoItemsQuery } from 'src/todos/application/queries/get-all-ToDo-items.query';
import { GetToDoItemByIdQuery } from 'src/todos/application/queries/get-ToDo-item-by-id.query';
import { UpdateToDoItemByIdCommand } from 'src/todos/application/commands/update-ToDo-item-by-id.command';
import { DeleteAllToDoItemsCommand } from 'src/todos/application/commands/delete-all-ToDo-items.command';
import { DeleteToDoItemByIdCommand } from 'src/todos/application/commands/delete-ToDo-item-by-id.command';
import { CreateToDoItemDto } from 'src/todos/application/dto/create-ToDo-item.dto';
import { UpdateToDoItemDto } from 'src/todos/application/dto/update-ToDo-item.dto';
import { ToDoItemEntity } from 'src/todos/domain/entity/ToDoItem.entity';
import { ToDoDbType } from '../domain/entity/ToDoDb.type';


@Controller('todos')
export class ToDoListController {
  constructor(private readonly commandBus: CommandBus, private readonly queryBus: QueryBus) {}

  @Post()
  async createToDoList(@Body() createToDoItemDto: CreateToDoItemDto): Promise<ToDoDbType> {
  
    const toDoList = new ToDoItemEntity(null, createToDoItemDto.title, createToDoItemDto.description, createToDoItemDto.completed);    // Assuming id is generated later in the database
    
    try {
      return  await this.commandBus.execute(new CreateToDoItemCommand(toDoList));
      
    } 
    catch (error) {
      console.log(error);
      return error;
    }
  }

  @Get()
  async getAllToDoLists(): Promise<ToDoItemEntity[]> {
    return await this.queryBus.execute(new GetAllToDoItemsQuery());
  }


  @Get(':id')
  async getToDoListById(@Param('id') id: number): Promise<ToDoItemEntity> {
    return await this.queryBus.execute(new GetToDoItemByIdQuery(id));
  }


  @Put(':id')
  async updateToDoListById(@Param('id') id: number, @Body() updateToDoItemDto: UpdateToDoItemDto): Promise<string> {
    const { title, description, completed } = updateToDoItemDto;
    return await this.commandBus.execute(new UpdateToDoItemByIdCommand(id, title, description, completed));
  }


  @Delete()
  async deleteAllToDoLists(): Promise<string> {
    return await this.commandBus.execute(new DeleteAllToDoItemsCommand());
  }


  @Delete(':id')
  async deleteToDoList(@Param('id') id: number): Promise<string> {
    return await this.commandBus.execute(new DeleteToDoItemByIdCommand(Number(id)));
  }

}
