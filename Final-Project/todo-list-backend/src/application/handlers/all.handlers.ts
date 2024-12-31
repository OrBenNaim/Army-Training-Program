import { CreateToDoItemHandler } from 'src/application/handlers/create-ToDoList.handler';

import { GetAllToDoItemsHandler } from 'src/application/handlers/get-all-ToDo-items.handler';

import { GetToDoItemByIdHandler } from 'src/application/handlers/get-ToDo-item-by-id.handler';

import { UpdateToDoListByIdHandler } from 'src/application/handlers/update-ToDo-item-by-id.handler';

import { DeleteToDoItemByIdHandler } from 'src/application/handlers/delete-ToDo-item-by-id.handler';

import { DeleteAllToDoItemsHandler } from 'src/application/handlers/delete-all-ToDoLists.handler';


export const CommandHandlers = [
    CreateToDoItemHandler,
    UpdateToDoListByIdHandler,
    DeleteToDoItemByIdHandler,
    DeleteAllToDoItemsHandler,
  ];
  
  export const QueryHandlers = [
    GetAllToDoItemsHandler,
    GetToDoItemByIdHandler,
  ];