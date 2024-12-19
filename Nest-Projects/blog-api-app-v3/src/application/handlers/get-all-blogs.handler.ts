import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { GetAllBlogsQuery } from 'src/application/queries/get-all-blogs.query';
import { BlogRepository } from 'src/infrastrucature/repositories/blog-repository-interface';

@QueryHandler(GetAllBlogsQuery)
export class GetAllBlogsHandler implements IQueryHandler<GetAllBlogsQuery> {
  constructor(private readonly blogRepository: BlogRepository) {}

  async execute(): Promise<any> {
    return await this.blogRepository.getBlogs;
  }
}
