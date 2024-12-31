import { Controller, Post, Body, Get, Delete, Param, Put } from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { CreateToDoListCommand } from '../application/commands/create-ToDoList.command';
import { GetAllToDoListsQuery } from 'src/application/queries/get-all-ToDoLists.query';
import { GetToDoListByIdQuery } from 'src/application/queries/get-ToDoList-by-id.query';
import { UpdateToDoListByIdCommand } from 'src/application/commands/update-ToDoList-by-id.command';
import { DeleteAllToDoListsCommand } from 'src/application/commands/delete-all-ToDoLists.command';
import { DeleteToDoListByIdCommand } from 'src/application/commands/delete-ToDoList-by-id.command';
import { ToDoListDto } from 'src/application/dto/ToDoList.dto';
import { ToDoListEntity } from 'src/domain/entities/ToDoList.entity';


@Controller('todos')
export class ToDoListController {
  constructor(private readonly commandBus: CommandBus, private readonly queryBus: QueryBus) {}

  @Post()
  async createToDoList(@Body() createToDoListDto: ToDoListDto): Promise<string> {
    const { title, description } = createToDoListDto;
    const toDoList = new ToDoListEntity(null, title, description, false);    // Assuming id is generated later and completed is false by default
    return await this.commandBus.execute(new CreateToDoListCommand(toDoList));
  }

  @Get()
  async getAllToDoLists(): Promise<ToDoListEntity[]> {
    return await this.queryBus.execute(new GetAllToDoListsQuery());
  }


  @Get(':id')
  async getToDoListById(@Param('id') id: number): Promise<ToDoListEntity> {
    return await this.queryBus.execute(new GetToDoListByIdQuery(id));
  }


  @Put(':id')
  async updateToDoListById(@Param('id') id: number, @Body() updatetoDoListDto: ToDoListDto): Promise<string> {
    const { title, description } = updatetoDoListDto;
    return await this.commandBus.execute(new UpdateToDoListByIdCommand(id, title, description));
  }


  @Delete()
  async deleteAllToDoLists(): Promise<string> {
    return await this.commandBus.execute(new DeleteAllToDoListsCommand());
  }


  @Delete(':id')
  async deleteToDoList(@Param('id') id: number): Promise<string> {
    return await this.commandBus.execute(new DeleteToDoListByIdCommand(Number(id)));
  }

}
