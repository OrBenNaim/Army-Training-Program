import { Body, Controller, Get, Param, ParseIntPipe, Post, UsePipes, ValidationPipe } from '@nestjs/common';
import { CreateBlogDto } from './dto/create-blog.dto';
import { BlogService } from './blog.service';
import { Blog } from './entity/blog.entity';

@UsePipes(new ValidationPipe())     // Enables validation
@Controller('blog')
export class BlogController {
    constructor(private readonly blogService: BlogService){}
    
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
    GetBlogById(@Param('id', ParseIntPipe) id: number): Blog{
        return this.blogService.findOne(id);
    }

}
