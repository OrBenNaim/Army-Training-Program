import { Injectable } from '@nestjs/common';
import { Blog } from './entity/blog.entity';
import { CreateBlogDto } from './create-blog.dto.ts/create-blog.dto';

@Injectable()
export class BlogService {
    private blogs: Blog[];      // Temporary in-memory storage
    private idCounter = 1;

    // Method to create a new blog
    create(createBlogDto: CreateBlogDto): Blog{
        const newBlog: Blog = {
            id: this.idCounter++,
            ...createBlogDto,
        };
        this.blogs.push(newBlog);
        return newBlog;
    }

    // Method to retrieve all blogs
    findAll(): Blog[] {
        return this.blogs;
    }
}
