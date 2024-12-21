import { Controller, Post, Body, Get, Delete, Param } from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { CreateBlogCommand } from '../application/commands/create-blog.command';
import { GetAllBlogsQuery } from 'src//application/queries/get-all-blogs.query';
import { DeleteBlogCommand } from 'src/application/commands/delete-blog.command';
import { CreateBlogDto } from 'src/application/dto/create-blog.dto';



@Controller('blogs')
export class BlogController {
  constructor(private readonly commandBus: CommandBus, private readonly queryBus: QueryBus) {}

  @Post()
  async createBlog(@Body() createBlogDto: CreateBlogDto): Promise<void> {
    const { title, content } = createBlogDto;
    await this.commandBus.execute(new CreateBlogCommand(title, content));
  }

  @Get()
  async getAllBlogs(): Promise<any> {
    return await this.queryBus.execute(new GetAllBlogsQuery());
  }

  @Delete(':id')
  async deleteBlog(@Param('id') id: number): Promise<void> {
    await this.commandBus.execute(new DeleteBlogCommand(Number(id)));
  }
}
