import { Blog } from 'src/domain/entities/blog.entity';
import { ICommand } from '@nestjs/cqrs';

export class CreateBlogCommand {
    constructor(public readonly blog: Blog) {}
  }
  