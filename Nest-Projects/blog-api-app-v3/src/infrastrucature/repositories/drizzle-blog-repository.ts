import { Injectable } from '@nestjs/common';
import { BlogRepository } from './blog-repository-interface';
import { Blog } from '../../domain/entities/blog.entity';
import { blogs } from '../database/schema';
import { drizzle, PgDatabase } from 'drizzle-orm/node-postgres';

@Injectable()
export class DrizzleBlogRepository implements BlogRepository {
  constructor(private readonly db: PgDatabase) {}

  async createBlog(blog: Blog): Promise<void> {
    if (blog.id) {
      await this.db.update(blogs).set({ title: blog.title, content: blog.content }).where(blogs.id.eq(blog.id)).execute();
    } else {
      await this.db.insert(blogs).values({ title: blog.title, content: blog.content }).execute();
    }
  }

  async getBlogByID(id: number): Promise<Blog | null> {
    const result = await this.db.select().from(blogs).where(blogs.id.eq(id)).execute();
    return result.length ? new Blog(result[0].id, result[0].title, result[0].content) : null;
  }

  async getBlogs(): Promise<Blog[]> {
    const results = await this.db.select().from(blogs).execute();
    return results.map(row => new Blog(row.id, row.title, row.content));
  }
}
