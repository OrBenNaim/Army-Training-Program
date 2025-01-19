import { CreateToDoItemHandler } from 'src/todos/application/handlers/createToDoItem.handler';

import { GetAllToDoItemsHandler } from 'src/todos/application/handlers/getAllToDosPerUser.handler';

import { GetToDoItemByIdHandler } from 'src/todos/application/handlers/getToDoItemById.handler';

import { UpdateToDoListByIdHandler } from 'src/todos/application/handlers/updateToDoItemById.handler';

import { DeleteToDoItemByIdHandler } from 'src/todos/application/handlers/deleteTodoItemById.handler';

import { DeleteAllToDosPerUserHandler } from 'src/todos/application/handlers/deleteAllToDosPerUser.handler';


export const CommandHandlers = [
    CreateToDoItemHandler,
    UpdateToDoListByIdHandler,
    DeleteToDoItemByIdHandler,
    DeleteAllToDosPerUserHandler,
  ];
  
  export const QueryHandlers = [
    GetAllToDoItemsHandler,
    GetToDoItemByIdHandler,
  ];