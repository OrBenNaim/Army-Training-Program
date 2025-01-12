import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { ToDosController } from './api/ToDos.controller';
import { TODOS_REPOSITORY } from './infrastructure/repositories/toDos.repository-interface';
import { CommandHandlers, QueryHandlers } from './application/handlers/all.handlers';
import { ToDosRepository } from './infrastructure/repositories/toDos.repository';

@Module({
    imports: [
      CqrsModule,      // Enables CQRS (Command Query Responsibility Segregation) pattern
    ],
    controllers: [ToDosController],
    providers: [
        { provide: TODOS_REPOSITORY, useClass: ToDosRepository },
        ...CommandHandlers,         // Registers all command handlers
        ...QueryHandlers,          // Registers all query handlers
      ],
})
export class TodosModule {}
