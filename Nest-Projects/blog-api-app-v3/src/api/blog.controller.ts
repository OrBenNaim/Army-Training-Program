import { Controller, Post, Body, Get, Delete, Param } from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { CreateBlogCommand } from '../application/commands/create-blog.command';
import { GetAllBlogsQuery } from 'src/application/queries/get-all-blogs.query';
import { GetBlogByIdQuery } from 'src/application/queries/get-blog-by-id.query';
import { DeleteBlogCommand } from 'src/application/commands/delete-blog.command';
import { CreateBlogDto } from 'src/application/dto/create-blog.dto';
import { Blog } from 'src/domain/entities/blog.entity';
import { GetJokeQuery } from 'src/application/queries/get-joke.query';


@Controller('blog')
export class BlogController {
  constructor(private readonly commandBus: CommandBus, private readonly queryBus: QueryBus) {}

  @Post()
  async createBlog(@Body() createBlogDto: CreateBlogDto): Promise<void> {
    const { title, content } = createBlogDto;
    const blog = new Blog(null, title, content);    // Assuming id is generated later
    await this.commandBus.execute(new CreateBlogCommand(blog));
  }

  @Get()
  async getAllBlogs(): Promise<Blog[]> {
    return await this.queryBus.execute(new GetAllBlogsQuery());
  }


  @Get(':id')
  async getBlogById(@Param('id') id: number): Promise<Blog> {
    return await this.queryBus.execute(new GetBlogByIdQuery(id));
  }


  @Delete(':id')
  async deleteBlog(@Param('id') id: number): Promise<void> {
    await this.commandBus.execute(new DeleteBlogCommand(Number(id)));
  }

  @Get('jokes/bublil')
  async getJoke(): Promise<string> {
    return await this.queryBus.execute(new GetJokeQuery());
  }
}
