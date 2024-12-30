import { CreateBlogHandler } from 'src/application/handlers/create-blog.handler';

import { GetAllBlogsHandler } from 'src/application/handlers/get-all-blogs.handler';

import { GetBlogByIdHandler } from 'src/application/handlers/get-blog-by-id.handler';

import { DeleteBlogByIdHandler } from 'src/application/handlers/delete-blog-by-id.handler';

import { DeleteAllBlogHandler } from 'src/application/handlers/delete-all-blogs.handler';


export const CommandHandlers = [
    CreateBlogHandler,
    DeleteBlogByIdHandler,
    DeleteAllBlogHandler,
  ];
  
  export const QueryHandlers = [
    GetAllBlogsHandler,
    GetBlogByIdHandler,
  ];