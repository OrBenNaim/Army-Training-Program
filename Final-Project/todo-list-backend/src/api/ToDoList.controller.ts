import { Controller, Post, Body, Get, Delete, Param } from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { CreateToDoListCommand } from '../application/commands/create-ToDoList.command';
import { GetAllToDoListsQuery } from 'src/application/queries/get-all-ToDoLists.query';
import { GetToDoListByIdQuery } from 'src/application/queries/get-ToDoList-by-id.query';
import { DeleteAllToDoListsCommand } from 'src/application/commands/delete-all-ToDoLists.command';
import { DeleteToDoListByIdCommand } from 'src/application/commands/delete-ToDoList-by-id.command';
import { CreateToDoListDto } from 'src/application/dto/create-ToDoList.dto';
import { ToDoListEntity } from 'src/domain/entities/ToDoList.entity';


@Controller('todos')
export class ToDoListController {
  constructor(private readonly commandBus: CommandBus, private readonly queryBus: QueryBus) {}

  @Post()
  async createToDoList(@Body() createBlogDto: CreateToDoListDto): Promise<void> {
    const { title, content } = createBlogDto;
    const toDoList = new ToDoListEntity(null, title, content);    // Assuming id is generated later
    await this.commandBus.execute(new CreateToDoListCommand(toDoList));
  }

  @Get()
  async getAllToDoLists(): Promise<ToDoListEntity[]> {
    return await this.queryBus.execute(new GetAllToDoListsQuery());
  }


  @Get(':id')
  async getToDoListById(@Param('id') id: number): Promise<ToDoListEntity> {
    return await this.queryBus.execute(new GetToDoListByIdQuery(id));
  }


  @Delete()
  async deleteAllToDoLists(): Promise<void> {
    await this.commandBus.execute(new DeleteAllToDoListsCommand());
  }


  @Delete(':id')
  async deleteBlog(@Param('id') id: number): Promise<void> {
    await this.commandBus.execute(new DeleteToDoListByIdCommand(Number(id)));
  }

}
