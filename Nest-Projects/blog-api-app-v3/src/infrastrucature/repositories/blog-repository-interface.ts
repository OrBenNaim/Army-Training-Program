import { Blog } from '../../domain/entities/blog.entity';

export const BLOG_REPOSITORY = 'BLOG_REPOSITORY';

export interface BlogRepository {
  createBlog(blog: Blog): Promise<void>;
  
  getBlogs(): Promise<Blog[]>;

  getBlogById(id: number): Promise<Blog>;
  
  deleteBlogById(id: number): Promise<void>;
}
