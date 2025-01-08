import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { AuthController } from 'src/auth/api/auth.controller';

@Module({
    imports: [
        CqrsModule,      // Enables CQRS (Command Query Responsibility Segregation) pattern
    ],
    controllers: [AuthController],
    providers: [
        { provide: USER_REPOSITORY, useClass: UserRepository },
        ...CommandHandlers,         // Registers all command handlers
        ...QueryHandlers,          // Registers all query handlers
        ],
})
export class UsersModule {}
