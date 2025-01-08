import { GetAllUsersHandler } from 'src/users/application/handlers/getAllUsers.handler';

import { GetUserHandler } from 'src/users/application/handlers/getUser.handler';

import { UpdateUserHandler } from 'src/users/application/handlers/updateUser.handler';

import { DeleteUserHandler } from 'src/users/application/handlers/deleteUser.handler';

import { DeleteAllUsersHandler } from 'src/users/application/handlers/deleteAllUsers.handler';


export const CommandHandlers = [
    UpdateUserHandler,
    DeleteUserHandler,
    DeleteAllUsersHandler,
  ];
  
  export const QueryHandlers = [
    GetAllUsersHandler,
    GetUserHandler,
  ];