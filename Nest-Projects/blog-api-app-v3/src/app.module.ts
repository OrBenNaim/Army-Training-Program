import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { BlogController } from './api/blog.controller';
import { CreateBlogHandler } from './application/handlers/create-blog.handler';
import { GetAllBlogsHandler } from './application/handlers/get-all-blogs.handler';
import { DrizzleBlogRepository } from './infrastructure/repositories/drizzle-blog-repository';
import { DatabaseModule } from './infrastructure/database.module';

@Module({
  imports: [CqrsModule, DatabaseModule],
  controllers: [BlogController],
  providers: [DrizzleBlogRepository, CreateBlogHandler, GetAllBlogsHandler],
})
export class AppModule {}
