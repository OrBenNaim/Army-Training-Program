import { Injectable } from '@nestjs/common';
import { BlogRepository } from './blog-repository-interface';
import { Blog } from '../../domain/entities/blog.entity';
import { blogs } from '../database/schema';
import { db } from '../database/database-config'; // Import the configured Drizzle instance

@Injectable()
export class DrizzleBlogRepository implements BlogRepository {
  constructor() {}

  async createBlog(blog: Blog): Promise<void> {
    if (blog.id) {
      await db.update(blogs).set({ title: blog.title, content: blog.content }).where(blogs.id.eq(blog.id)).execute();
    } else {
      await db.insert(blogs).values({ title: blog.title, content: blog.content }).execute();
    }
  }

  async getBlogByID(id: number): Promise<Blog | null> {
    const result = await db.select().from(blogs).where(blogs.id.eq(id)).execute();
    return result.length ? new Blog(result[0].id, result[0].title, result[0].content) : null;
  }

  async getBlogs(): Promise<Blog[]> {
    const results = await db.select().from(blogs).execute();
    return results.map(row => new Blog(row.id, row.title, row.content));
  }

  async deleteBlogByID(id: number): Promise<void> {
    await db.delete(blogs).where(blogs.id.eq(id)).execute();
  }
}
