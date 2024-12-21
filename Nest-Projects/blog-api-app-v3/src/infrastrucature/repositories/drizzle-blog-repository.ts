import { Injectable, Inject } from '@nestjs/common';
import { BlogRepository } from './blog-repository-interface';
import { Blog } from '../../domain/entities/blog.entity';
import { blogs } from '../database/schema';
import { DatabaseModule } from '../database/db.module'; // Import the configured Drizzle instance
import { DATABASE_CONNECTION } from '../database/db-connection';
import { NodePgDatabase } from 'drizzle-orm/node-postgres';
import * as schema from '../database/schema';
import { eq } from 'drizzle-orm';
import { ConfigService } from '@nestjs/config';


@Injectable()
export class DrizzleBlogRepository implements BlogRepository {
  constructor(
    @Inject(DATABASE_CONNECTION) private readonly database: NodePgDatabase<typeof schema>,
        private readonly configService: ConfigService
  ) {}

  async createBlog(blog: Blog): Promise<void> {
    if (blog.id) {
      await this.database.update(blogs).set({ title: blog.title, content: blog.content }).where(eq(blogs.id, blog.id)).execute();
    } 
    else {
      await this.database.insert(blogs).values({ title: blog.title, content: blog.content }).execute();
    }
  }

  async getBlogById(id: number): Promise<Blog | null> {
    const result = await this.database.select().from(blogs).where(eq(blogs.id, id)).execute();
    return result.length ? new Blog(result[0].id, result[0].title, result[0].content) : null;
  }

  async getBlogs(): Promise<Blog[]> {
    const results = await this.database.select().from(blogs).execute();
    return results.map(row => new Blog(row.id, row.title, row.content));
  }

  async deleteBlogById(id: number): Promise<void> {
    await this.database.delete(blogs).where(eq(blogs.id, id)).execute();
  }
}
