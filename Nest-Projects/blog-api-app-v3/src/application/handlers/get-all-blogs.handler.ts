import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';
import { Blog } from 'src/domain/entities/blog.entity';
import { GetAllBlogsQuery } from 'src/application/queries/get-all-blogs.query';
import { BlogRepository, BLOG_REPOSITORY} from 'src/infrastrucature/repositories/blog-repository-interface';

@QueryHandler(GetAllBlogsQuery)
export class GetAllBlogsHandler implements IQueryHandler<GetAllBlogsQuery> {
  constructor(@Inject(BLOG_REPOSITORY) private readonly blogRepository: BlogRepository) {}

  async execute(): Promise<Blog[]> {
    return await this.blogRepository.getBlogs();
  }
}
