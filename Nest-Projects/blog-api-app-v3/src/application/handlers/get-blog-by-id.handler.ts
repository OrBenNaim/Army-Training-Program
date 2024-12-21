import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { Inject, NotFoundException } from '@nestjs/common';
import { Blog } from 'src/domain/entities/blog.entity';
import { GetBlogByIdQuery } from 'src/application/queries/get-blog-by-id.query';
import { BlogRepository, BLOG_REPOSITORY} from 'src/infrastrucature/repositories/blog-repository-interface';

@QueryHandler(GetBlogByIdQuery)
export class GetBlogByIdHandler implements IQueryHandler<GetBlogByIdQuery> {
  constructor(@Inject(BLOG_REPOSITORY) private readonly blogRepository: BlogRepository) {}

  async execute(query: GetBlogByIdQuery): Promise<Blog> {
    const {id} = query;
    return this.blogRepository.getBlogById(id);
  }
}
