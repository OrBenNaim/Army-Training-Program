import { Blog } from '../../domain/entities/blog.entity';

export interface BlogRepository {
  async createBlog(blog: Blog): Promise<void>;
    
  async findById(id: number): Promise<Blog | null>;
  
  async getBlogs(): Promise<Blog[]>;

  async getBlogsById(): Promise<Blog>;
  
  async deleteById(id: number): Promise<void>;
}
