import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { DeleteBlogCommand } from '../commands/delete-blog.command';
import { BlogRepository } from 'src/infrastrucature/repositories/blog-repository-interface';
import { NotFoundException } from 'src/common/exceptions/not-found-.exception';

@CommandHandler(DeleteBlogCommand)
export class DeleteBlogHandler implements ICommandHandler<DeleteBlogCommand> {
  constructor(private readonly blogRepository: BlogRepository) {}

  async execute(command: DeleteBlogCommand): Promise<void> {
    const blog = await this.blogRepository.findById(command.id);
    if (!blog) {
      throw new NotFoundException(`Blog with ID ${command.id} not found.`);
    }
    await this.blogRepository.deleteById(command.id);
  }
}
