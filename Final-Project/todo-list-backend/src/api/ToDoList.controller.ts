import { Controller, Post, Body, Get, Delete, Param, Put } from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { CreateToDoItemCommand } from '../application/commands/create-ToDo-item.command';
import { GetAllToDoItemsQuery } from 'src/application/queries/get-all-ToDo-items.query';
import { GetToDoItemByIdQuery } from 'src/application/queries/get-ToDo-item-by-id.query';
import { UpdateToDoItemByIdCommand } from 'src/application/commands/update-ToDo-item-by-id.command';
import { DeleteAllToDoItemsCommand } from 'src/application/commands/delete-all-ToDo-items.command';
import { DeleteToDoItemByIdCommand } from 'src/application/commands/delete-ToDo-item-by-id.command';
import { CreateToDoItemDto } from 'src/application/dto/create-ToDo-item.dto';
import { UpdateToDoItemDto } from 'src/application/dto/update-ToDo-item.dto';
import { ToDoItemEntity } from 'src/domain/entities/ToDoItem.entity';


@Controller('todos')
export class ToDoListController {
  constructor(private readonly commandBus: CommandBus, private readonly queryBus: QueryBus) {}

  @Post()
  async createToDoList(@Body() createToDoItemDto: CreateToDoItemDto): Promise<string> {
    const { title, description } = createToDoItemDto;
    const toDoList = new ToDoItemEntity(null, title, description, false);    // Assuming id is generated later and completed is false by default
    return await this.commandBus.execute(new CreateToDoItemCommand(toDoList));
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
  async updateToDoListById(@Param('id') id: number, @Body() updatetoDoListDto: UpdateToDoItemDto): Promise<string> {
    const { title, description } = updatetoDoListDto;
    return await this.commandBus.execute(new UpdateToDoItemByIdCommand(id, title, description));
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
