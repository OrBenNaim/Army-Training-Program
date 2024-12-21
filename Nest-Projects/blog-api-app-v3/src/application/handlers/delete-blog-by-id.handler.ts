import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';
import { DeleteBlogByIdCommand } from '../commands/delete-blog-by-id.command';
import { BlogRepository, BLOG_REPOSITORY } from 'src/infrastrucature/repositories/blog-repository-interface';
import { NotFoundException } from 'src/common/exceptions/not-found-.exception';


@CommandHandler(DeleteBlogByIdCommand)
export class DeleteBlogByIdHandler implements ICommandHandler<DeleteBlogByIdCommand> {
  constructor(@Inject(BLOG_REPOSITORY) private readonly blogRepository: BlogRepository) {}

  async execute(command: DeleteBlogByIdCommand): Promise<void> {
    await this.blogRepository.deleteBlogById(command.id);
  }
}
