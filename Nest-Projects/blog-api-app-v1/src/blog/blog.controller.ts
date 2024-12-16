import { Body, Controller, Get, Param, ParseIntPipe, Post, UsePipes, ValidationPipe } from '@nestjs/common';
import { CreateBlogDto } from './dto/create-blog.dto';
import { BlogService } from './blog.service';
import { ConfigService } from '@nestjs/config';
import { Blog } from './entity/blog.entity';

@UsePipes(new ValidationPipe())     // Enables validation
@Controller('blog')
export class BlogController {
    constructor(
        private readonly blogService: BlogService,
        private configService: ConfigService){}
    
    // Endpoint: POST /blog
    @Post()                             // Handles Get Requests to /blog
    createBlog(@Body() createBlogDto: CreateBlogDto){
        return this.blogService.createBlog(createBlogDto);
    }

    // Endpoint: GET /blog
    @Get()
    getAll(): Blog[] {
        return this.blogService.findAll();
    }

    // Endpoint: GET /blog/id
    @Get(':id')
    getBlogById(@Param('id', ParseIntPipe) id: number): Blog{
        return this.blogService.findOne(id);
    }

    // Endpoint: GET /blog/jokes/bublil
    @Get('jokes/bublil')    // Define a static, unique route
    async getJoke(): Promise<string>{
        return this.blogService.findJoke()
    } 

}
