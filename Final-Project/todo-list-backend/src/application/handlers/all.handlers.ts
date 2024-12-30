import { CreateToDoListHandler } from 'src/application/handlers/create-ToDoList.handler';

import { GetAllToDoListsHandler } from 'src/application/handlers/get-all-ToDoLists.handler';

import { GetToDoListByIdHandler } from 'src/application/handlers/get-ToDoList-by-id.handler';

import { DeleteToDoListByIdHandler } from 'src/application/handlers/delete-ToDoList-by-id.handler';

import { DeleteAllToDoListsHandler } from 'src/application/handlers/delete-all-ToDoLists.handler';


export const CommandHandlers = [
    CreateToDoListHandler,
    DeleteToDoListByIdHandler,
    DeleteAllToDoListsHandler,
  ];
  
  export const QueryHandlers = [
    GetAllToDoListsHandler,
    GetToDoListByIdHandler,
  ];