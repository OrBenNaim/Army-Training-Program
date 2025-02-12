import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';
import { Blog } from 'src/domain/entities/blog.entity';
import { GetJokeQuery } from 'src/application/queries/get-joke.query';
import { BlogRepository, BLOG_REPOSITORY} from 'src/infrastructure/repositories/blog-repository-interface';

@QueryHandler(GetJokeQuery)
export class GetJokeHandler implements IQueryHandler<GetJokeQuery> {
  constructor(@Inject(BLOG_REPOSITORY) private readonly blogRepository: BlogRepository) {}

  async execute(): Promise<string> {
    return await this.blogRepository.getJoke();
  }
}
