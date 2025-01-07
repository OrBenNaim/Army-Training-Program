import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { AuthController } from './api/auth.controller';
import { AUTH_REPOSITORY } from './infrastructure/repository/auth.repository-interface';
import { AuthRepository } from './infrastructure/repository/auth.repository';
import { CommandHandlers, QueryHandlers } from './application/handlers/all.handlers';

@Module({
    imports: [
      CqrsModule,      // Enables CQRS (Command Query Responsibility Segregation) pattern
    ],
    controllers: [AuthController],
    providers: [
        { provide: AUTH_REPOSITORY, useClass: AuthRepository },
        ...CommandHandlers,         // Registers all command handlers
        ...QueryHandlers,          // Registers all query handlers
      ],
})
export class AuthModule {}