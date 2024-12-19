import { Blog } from '../../domain/entities/blog.entity';

export interface BlogRepository {
  createBlog(blog: Blog): Promise<void>;
    
  findById(id: number): Promise<Blog | null>;
  
  getBlogs(): Promise<Blog[]>;

  getBlogsById(): Promise<Blog>;
  
  deleteById(id: number): Promise<void>;
}
