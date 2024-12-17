import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { Blog } from './entity/blog.entity';
import { CreateBlogDto } from './dto/create-blog.dto';
import { ConfigService } from '@nestjs/config';
import axios from 'axios';
import { DATABASE_CONNECTION } from 'src/database/db-connection';
import { NodePgDatabase } from 'drizzle-orm/node-postgres';
import * as schema from 'src/database/schema';
import { eq } from 'drizzle-orm';



@Injectable()
export class BlogService {
    constructor(
        @Inject(DATABASE_CONNECTION) private readonly database: NodePgDatabase<typeof schema>,
        private readonly configService: ConfigService) { }


    // Method to create a new blog
    async createBlog(blog: typeof schema.blogs.$inferInsert): Promise<void> {
        try {
            await this.database.insert(schema.blogs).values(blog);
            console.log('\nBlog successfully created:', blog);
        }
        catch (error) {
            console.error('\nError creating blog:', error.message);
            throw new Error('\nUnable to create blog at the moment.');
        }
    }


    // Method to retrieve all blogs
    async getBlogs(): Promise<Blog[]>{
        try {
            const blogs = await this.database.query.blogs.findMany();
            console.log('\nGet request successfully made');
            return blogs as Blog[]; // Cast the result to the Blog type
        }
        catch (error) {
            console.log(error)
            throw new Error('\nUnable to retrive blogs at the moment.');
        }

    }

    // Method to retrieve specific blog by ID
    async getBlogById(ID: number): Promise<Blog> {
        try {
            const blog = await this.database.query.blogs.findFirst({
                where: eq(schema.blogs.id, ID),
            });

            if (!blog) {
                throw new NotFoundException(`\nBlog with ID ${ID} not found\n`);
            }
            
            console.log('\nGet request by ID is successfully made');
            return blog as Blog;

        } catch (error) {
            console.error(error);
            throw new Error(`\nUnable to retrieve blog with ID=${ID} at the moment.\n`);
        }
    }


    // Method to delete a blog by ID
    async deleteBlogById(ID: number): Promise<Blog>{
        try{
            const blog = await this.database.query.blogs.findFirst({
                where: eq(schema.blogs.id, ID),
            });
    
            if (!blog) {
                throw new Error(`\nBlog with ID ${ID} not found\n`);
            }
            
            await this.database.delete(schema.blogs).where(eq(schema.blogs.id, ID));
            console.log('\nDELETE request by id successfully made\n');
            return blog;
        }
        catch(error){
            throw new Error(error.message || '\nUnable to delete the specific blog at the moment.\n');
        }
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
            console.error('\nError fetching joke:', error.message);
            throw new Error('\nUnable to fetch the joke at the moment.');      // Return user-friendly error
        }
    }
}
