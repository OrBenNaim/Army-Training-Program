import { GetAllUsersHandler } from 'src/users/application/handlers/getAllUsers.handler';

import { GetUserByNameHandler } from 'src/users/application/handlers/getUser.handler';

//import { UpdateUserHandler } from 'src/users/application/handlers/updateUser.handler';

import { DeleteUserHandler } from 'src/users/application/handlers/deleteUser.handler';

import { DeleteAllUsersHandler } from 'src/users/application/handlers/deleteAllUsers.handler';

import { CreateNewUserCommand } from '../commands/createNewUser.command';


export const CommandHandlers = [
    CreateNewUserCommand,
    //UpdateUserHandler,
    DeleteUserHandler,
    DeleteAllUsersHandler,
  ];
  
  export const QueryHandlers = [
    GetAllUsersHandler,
    GetUserByNameHandler,
  ];
  