import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { ConfigModule } from '@nestjs/config';
import { BlogController } from './api/blog.controller';
import { CommandHandlers, QueryHandlers } from 'src/application/handlers/all.handlers';
import { DrizzleBlogRepository } from 'src/infrastructure/repositories/drizzle-blog-repository';
import { DatabaseModule } from 'src/infrastructure/database/db.module';
import { BLOG_REPOSITORY } from 'src/infrastructure/repositories/blog-repository-interface';


@Module({
  imports: [
    CqrsModule,             // Enables CQRS (Command Query Responsibility Segregation) pattern
    ConfigModule.forRoot({  // Loads environment variables from a .env file into process.env
      isGlobal: true,
    }),
    DatabaseModule,         // Imports the DatabaseModule which sets up the database connection
  ],
  controllers: [BlogController],  // Registers the BlogController to handle incoming HTTP requests
  providers: [
    { provide: BLOG_REPOSITORY, useClass: DrizzleBlogRepository },
    ...CommandHandlers,         // Registers all command handlers
    ...QueryHandlers,          // Registers all query handlers
  ],
})
export class AppModule {}