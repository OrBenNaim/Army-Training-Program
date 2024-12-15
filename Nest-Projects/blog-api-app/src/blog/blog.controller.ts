import { Body, Controller, Get, Post, UsePipes, ValidationPipe } from '@nestjs/common';
import { CreateBlogDto } from './create-blog.dto.ts';
import { BlogService } from './blog.service.ts';

@Controller('blog')
export class BlogController {
    constructor(private readonly blogService: BlogService){}
    
    @Post()   // Handles Get Requests to /blog
    @UsePipes(new ValidationPipe())     // Enables validation
    createBlog(@Body() createBlogDto: CreateBlogDtoTs){
        return this.blogService.createBlog(createBlogDto);
    }
}
