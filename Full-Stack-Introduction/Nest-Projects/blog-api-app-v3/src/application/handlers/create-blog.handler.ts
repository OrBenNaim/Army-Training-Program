import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';
import { BlogRepository, BLOG_REPOSITORY } from 'src/infrastructure/repositories/blog-repository-interface';
import { CreateBlogCommand } from '../commands/create-blog.command';


@CommandHandler(CreateBlogCommand)
export class CreateBlogHandler implements ICommandHandler<CreateBlogCommand> {
  constructor(
    @Inject(BLOG_REPOSITORY) private readonly blogRepository: BlogRepository,
  ) {}

  async execute(command: CreateBlogCommand): Promise<void> {
    const { blog } = command;
    await this.blogRepository.createBlog(blog);
  }
}