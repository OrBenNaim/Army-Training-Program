import { CreateToDoItemHandler } from 'src/todos/application/handlers/create-ToDoList.handler';

import { GetAllToDoItemsHandler } from 'src/todos/application/handlers/get-all-ToDo-items.handler';

import { GetToDoItemByIdHandler } from 'src/todos/application/handlers/get-ToDo-item-by-id.handler';

import { UpdateToDoListByIdHandler } from 'src/todos/application/handlers/update-ToDo-item-by-id.handler';

// import { DeleteToDoItemByIdHandler } from 'src/todos/application/handlers/delete-ToDo-item-by-id.handler';

// import { DeleteAllToDoItemsHandler } from 'src/todos/application/handlers/delete-all-ToDoLists.handler';


export const CommandHandlers = [
    CreateToDoItemHandler,
    UpdateToDoListByIdHandler,
    // DeleteToDoItemByIdHandler,
    // DeleteAllToDoItemsHandler,
  ];
  
  export const QueryHandlers = [
    GetAllToDoItemsHandler,
    GetToDoItemByIdHandler,
  ];