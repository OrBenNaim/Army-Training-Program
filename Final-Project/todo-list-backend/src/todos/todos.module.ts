import { Module } from '@nestjs/common';
import { ToDoListController } from './api/ToDoList.controller';
import { TODOLIST_REPOSITORY } from './infrastructure/repositories/toDoList.repository-interface';
import { CommandHandlers, QueryHandlers } from './application/handlers/all.handlers';
import { ToDoListRepository } from './infrastructure/repositories/toDoList.repository';

@Module({
    imports: [],
    controllers: [ToDoListController],
    providers: [
        { provide: TODOLIST_REPOSITORY, useClass: ToDoListRepository },
        ...CommandHandlers,         // Registers all command handlers
        ...QueryHandlers,          // Registers all query handlers
      ],
})
export class TodosModule {}
