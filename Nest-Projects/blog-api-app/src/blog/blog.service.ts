import { Injectable, NotFoundException } from '@nestjs/common';
import { Blog } from './entity/blog.entity';
import { CreateBlogDto } from './dto/create-blog.dto';
import axios from 'axios';

@Injectable()
export class BlogService {
    private blogs: Blog[];      // Temporary in-memory storage
    private idCounter = 1;
    constructor(){
        this.blogs = []
    }


    // Method to create a new blog
    createBlog(createBlogDto: CreateBlogDto): Blog{
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


    // Method to retrieve specific blog
    findOne(ID: number): Blog{
        const blog = this.blogs.find((blog) => blog.id === ID);
        if (!blog) {
            throw new NotFoundException(`Blog with ID ${ID} not found.`);
        }
        return blog;

    }

     // Method to fetch a joke
    async findJoke(url: string): Promise<string> {
        try {
            const response = await axios.get(url);
            const modifiedJoke = response.data.value.replace('Chuck Norris', 'Bublil');
            return modifiedJoke;        // Return the modified joke
        } 
        catch (error) {
            console.error('Error fetching joke:', error.message);
            throw new Error('Unable to fetch the joke at the moment.');      // Return user-friendly error
        }
    }
}