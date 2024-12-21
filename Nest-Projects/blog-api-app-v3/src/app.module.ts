import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { ConfigModule } from '@nestjs/config';
import { BlogController } from './api/blog.controller';
import { CreateBlogHandler } from './application/handlers/create-blog.handler';
import { GetAllBlogsHandler } from './application/handlers/get-all-blogs.handler';
import { GetBlogByIdHandler } from './application/handlers/get-blog-by-id.handler';
import { DrizzleBlogRepository } from 'src/infrastrucature/repositories/drizzle-blog-repository';
import { DatabaseModule } from 'src/infrastrucature/database/db.module';
import { BLOG_REPOSITORY } from 'src/infrastrucature/repositories/blog-repository-interface';
import { GetJokeHandler } from './application/handlers/get-joke.handler';
import { DeleteBlogByIdHandler } from './application/handlers/delete-blog.handler';
import { DeleteAllBlogHandler } from './application/handlers/delete-all-blogs.handler';


@Module({
  imports: [
    CqrsModule,
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    DatabaseModule,
  ],
  controllers: [BlogController],
  providers: [
    { provide: BLOG_REPOSITORY, useClass: DrizzleBlogRepository },
    CreateBlogHandler,
    GetAllBlogsHandler,
    GetBlogByIdHandler,
    GetJokeHandler,
    DeleteBlogByIdHandler,
    DeleteAllBlogHandler
  ],
})
export class AppModule {}