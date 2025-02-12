import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { DatabaseModule } from 'src/database/db.module';
import { AuthModule } from './auth/auth.module';
import { TodosModule } from './todos/todos.module';
import { UsersModule } from './users/users.module';


@Module({
  imports: [
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