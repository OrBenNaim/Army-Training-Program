import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';
import { DeleteAllBlogsCommand } from '../commands/delete-all-blogs.command';
import { BlogRepository, BLOG_REPOSITORY } from 'src/infrastructure/repositories/blog-repository-interface';
import { NotFoundException } from 'src/common/exceptions/not-found-.exception';


@CommandHandler(DeleteAllBlogsCommand)
export class DeleteAllBlogHandler implements ICommandHandler<DeleteAllBlogsCommand> {
  constructor(@Inject(BLOG_REPOSITORY) private readonly blogRepository: BlogRepository) {}

  async execute(command: DeleteAllBlogsCommand): Promise<void> {
    await this.blogRepository.deleteAllBlogs();
  }
}