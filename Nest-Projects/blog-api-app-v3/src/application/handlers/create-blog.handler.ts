import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { CreateBlogCommand } from '../commands/create-blog.command';
import { BlogRepository } from '../../domain/repositories/blog-repository.interface';
import { Blog } from '../../domain/entities/blog.entity';

@CommandHandler(CreateBlogCommand)
export class CreateBlogHandler implements ICommandHandler<CreateBlogCommand> {
  constructor(private readonly blogRepository: BlogRepository) {}

  async execute(command: CreateBlogCommand): Promise<void> {
    const { title, content } = command;
    const blog = new Blog(undefined, title, content);
    await this.blogRepository.createBlog(blog);
  }
}
