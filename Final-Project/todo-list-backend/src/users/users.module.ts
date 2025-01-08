import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { AuthController } from 'src/auth/api/auth.controller';
import { USERS_REPOSITORY } from './infrastructure/repository/users.repository-interface';
import { UsersRepository } from './infrastructure/repository/users.repository';
import { CommandHandlers, QueryHandlers } from './application/handlers/all.handlers';
import { UsersController } from './api/users.controller';


@Module({
    imports: [
        CqrsModule,      // Enables CQRS (Command Query Responsibility Segregation) pattern
    ],
    controllers: [UsersController],
    providers: [
        { provide: USERS_REPOSITORY, useClass: UsersRepository },
        ...CommandHandlers,         // Registers all command handlers
        ...QueryHandlers,          // Registers all query handlers
        ],
})
export class UsersModule {}
