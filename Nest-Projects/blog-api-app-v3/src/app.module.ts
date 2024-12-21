import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { ConfigModule } from '@nestjs/config';
import { BlogController } from './api/blog.controller';
import { CommandHandlers, QueryHandlers } from 'src/application/handlers/all.handlers';
import { DrizzleBlogRepository } from 'src/infrastrucature/repositories/drizzle-blog-repository';
import { DatabaseModule } from 'src/infrastrucature/database/db.module';
import { BLOG_REPOSITORY } from 'src/infrastrucature/repositories/blog-repository-interface';


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
    ...CommandHandlers,
    ...QueryHandlers,
  ],
})
export class AppModule {}