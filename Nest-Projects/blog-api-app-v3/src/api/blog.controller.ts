import { Controller, Post, Body, Get } from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { CreateBlogCommand } from '../application/commands/create-blog.command';
import { GetAllBlogsQuery } from '../application/queries/get-all-blogs.query';

@Controller('blogs')
export class BlogController {
  constructor(private readonly commandBus: CommandBus, private readonly queryBus: QueryBus) {}

  @Post()
  async createBlog(@Body() body: { title: string; content: string }): Promise<void> {
    const { title, content } = body;
    await this.commandBus.execute(new CreateBlogCommand(title, content));
  }

  @Get()
  async getAllBlogs(): Promise<any> {
    return await this.queryBus.execute(new GetAllBlogsQuery());
  }
}
