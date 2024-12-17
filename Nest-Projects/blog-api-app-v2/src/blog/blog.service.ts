import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { Blog } from './entity/blog.entity';
import { CreateBlogDto } from './dto/create-blog.dto';
import { ConfigService } from '@nestjs/config';
import axios from 'axios';
import { DATABASE_CONNECTION } from 'src/database/db-connection';
import { NodePgDatabase } from 'drizzle-orm/node-postgres';
import * as schema from './schema';

@Injectable()
export class BlogService {
    constructor(
        @Inject(DATABASE_CONNECTION) private readonly database: NodePgDatabase<typeof schema>,
        private readonly configService: ConfigService) {}


    // Method to create a new blog
    async createBlog(blog: typeof schema.blogs.$inferInsert): Promise<void> {
        try {
            await this.database.insert(schema.blogs).values(blog);
            console.log('\nBlog successfully created:', blog);
        } 
        catch (error) {
            console.error('Error creating blog:', error.message);
            throw new Error('Unable to create blog at the moment.');
        }
    }


    // Method to retrieve all blogs
    async getBlogs() {
        return this.database.query.blogs.findMany();
        
        // try {
            
        //     // Assert the return type explicitly to Blog[]
        //     const blogsData = await this.database.query.blogs.findMany() as unknown as Blog[];
        //     return blogsData;
        // } 
        // catch (error) {
        //     console.error('Error retrieving blogs:', error.message);
        //     throw new Error('Unable to fetch blogs at the moment.');
        // }
    }



    // Method to fetch a joke
    async findJoke(): Promise<string> {
        try {
            const url: string = this.configService.get<string>('JOKE_URL');
            if (!url) {
                throw new Error('JOKE_URL is not defined in the environment variables');
            }

            console.log('Fetched URL from environment:', url); // Debug log
            
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
