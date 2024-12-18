import { Body, Controller, Delete, Get, Param, ParseIntPipe, Post, UsePipes, ValidationPipe } from '@nestjs/common';
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
    @Post()     // Handles Get Requests to /blog
    createBlog(@Body() createBlogDto: CreateBlogDto){
        return this.blogService.createBlog(createBlogDto);
    }

    // Endpoint: GET /blog
    @Get()
    async getBlogs(){
        return this.blogService.getBlogs();     // Return all the existing blogs
    }

    // Endpoint: GET /blog/id
    @Get(':id')
    async getBlogById(@Param('id', ParseIntPipe) id: number) {
        return this.blogService.getBlogById(id);
    }


    // Endpoint: DELETE /blog/id
    @Delete(':id')
    async deleteBlogById(@Param('id', ParseIntPipe) id: number) {
        return this.blogService.deleteBlogById(id);
    }


    // Endpoint: GET /blog/jokes/bublil
    @Get('jokes/bublil')    // Define a static, unique route
    async getJoke(): Promise<string>{
        return this.blogService.findJoke()
    } 

}
