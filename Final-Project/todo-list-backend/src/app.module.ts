import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { ConfigModule } from '@nestjs/config';
import { ToDoListController } from './api/ToDoList.controller';
import { CommandHandlers, QueryHandlers } from 'src/application/handlers/all.handlers';
import { DrizzleToDoListRepository } from 'src/infrastructure/repositories/drizzle-blog-repository';
import { DatabaseModule } from 'src/infrastructure/database/db.module';
import { TODOLIST_REPOSITORY } from 'src/infrastructure/repositories/ToDoList-repository-interface';


@Module({
  imports: [
    CqrsModule,             // Enables CQRS (Command Query Responsibility Segregation) pattern
    ConfigModule.forRoot({  // Loads environment variables from a .env file into process.env
      isGlobal: true,
    }),
    DatabaseModule,         // Imports the DatabaseModule which sets up the database connection
  ],
  controllers: [ToDoListController],  // Registers the ToDoListController to handle incoming HTTP requests
  providers: [
    { provide: TODOLIST_REPOSITORY, useClass: DrizzleToDoListRepository },
    ...CommandHandlers,         // Registers all command handlers
    ...QueryHandlers,          // Registers all query handlers
  ],
})
export class AppModule {}