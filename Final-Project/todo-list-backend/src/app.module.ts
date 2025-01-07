import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { ConfigModule } from '@nestjs/config';
import { ToDoListController } from './todos/api/ToDoList.controller';
import { CommandHandlers, QueryHandlers } from 'src/todos/application/handlers/all.handlers';
import { ToDoListRepository } from 'src/todos/infrastructure/repositories/toDoList.repository';
import { DatabaseModule } from 'src/database/db.module';
import { TODOLIST_REPOSITORY } from 'src/todos/infrastructure/repositories/toDoList.repository-interface';
import { AuthController } from './users/auth.controller';
import { AuthModuleOptions } from '@nestjs/passport';
import { AuthModule } from './auth/auth.module';
import { TodosModule } from './todos/todos.module';
import { UsersModule } from './users/users.module';


@Module({
  imports: [
    CqrsModule,             // Enables CQRS (Command Query Responsibility Segregation) pattern
    ConfigModule.forRoot({  // Loads environment variables from a .env file into process.env
      isGlobal: true,
    }),
    DatabaseModule,         // Imports the DatabaseModule which sets up the database connection
    AuthModule,
    TodosModule,
    UsersModule,
  ],
})
export class AppModule {}