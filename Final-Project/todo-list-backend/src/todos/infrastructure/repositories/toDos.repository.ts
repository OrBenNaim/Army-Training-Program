import { Injectable, Inject, NotFoundException, ConflictException } from '@nestjs/common';
import { ToDosRepositoryInterface } from './todos.repository-interface';
import { ToDoEntity } from '../../domain/entity/ToDo.interface';
import * as schema from 'src/database/schemas/todos';
import { todosTable } from 'src/database/schemas/todos';
import { DATABASE_CONNECTION } from 'src/database/db-connection';
import { NodePgDatabase } from 'drizzle-orm/node-postgres';
import { eq, not, and } from 'drizzle-orm';
import { ConfigService } from '@nestjs/config';
import { CreateToDoItemDto, UpdateToDoItemDto } from 'src/todos/application/dto/todo.dto';



@Injectable()
export class ToDosRepository implements ToDosRepositoryInterface {
  constructor(
    @Inject(DATABASE_CONNECTION) private readonly database: NodePgDatabase<typeof schema>,
  ) {}


  // Method to create a new ToDoItem
  async createToDoItem(createToDoItemDto: CreateToDoItemDto, userId: number): Promise<ToDoEntity> {

    // Check if the given userId already has a todo item with the same title
    const result = await this.database
    .select()
    .from(todosTable)
    .where(and(eq(todosTable.title, createToDoItemDto.title), eq(todosTable.userId, userId))).execute();

    if (result.length) {
      throw new ConflictException(`ToDo Item with title '${createToDoItemDto.title}' is already exists for userId=${userId}.`);
    }
      
    const todoItem = await this.database.insert(todosTable)
    .values({ 
      title: createToDoItemDto.title, 
      description: createToDoItemDto.description, 
      completed: createToDoItemDto.completed,
      userId: userId,  // Add the userId to the new ToDoItem
    })
    .returning({
      id: todosTable.id,
      title: todosTable.title,
      description: todosTable.description,
      completed: todosTable.completed,
      userId: todosTable.userId,
      createdAt: todosTable.createdAt,
    })
    .execute()
    .then(todos => todos[0]);

    return todoItem;   // Return the newly created ToDoItem
  }


  // Method to retrieve all ToDoItems per userId
  async getAllToDosPerUser(userId: number): Promise<ToDoEntity[]> {
    const all_todos_per_user = await this.database
    .select()
    .from(todosTable)
    .where(eq(todosTable.userId, userId))
    .execute();
    
    return all_todos_per_user;
  }


  // Method to retrieve specific ToDoItem by ID
  async getToDoItemById(id: number): Promise<ToDoEntity> {
    const todoItem = await this.database
    .select()
    .from(todosTable)
    .where(eq(todosTable.id, id))
    .execute()
    .then(todos => todos[0]);
    
    /* list_of_ToDoItems[0] is the first element of the array, 
    which is the ToDoItem and should be the only element in the array with the passwd id.*/

    if (!todoItem)  
    {
      throw new NotFoundException(`ToDo Item with ID ${id} not found.`);
    }
    return todoItem;
  }


  // Method to update a ToDoItem by ID
  async updateToDoItemById(id: number, updateToDoItemDto: UpdateToDoItemDto): Promise<ToDoEntity> {
  
    const todoItem = await this.getToDoItemById(id);

    // Check if the new title already exists in the database in another ToDoItem
    const result = await this.database
    .select()
    .from(todosTable)
    .where(and(eq(todosTable.title, updateToDoItemDto.title), not(eq(todosTable.id, id))))
    .execute();

    if (result.length) {
      throw new ConflictException(`ToDo Item with title '${updateToDoItemDto.title}' is already exists.`);
    }

    // Update only if the new value is not null
    const updatedTitle = updateToDoItemDto.title ?? todoItem.title;
    const updatedDescription = updateToDoItemDto.description ?? todoItem.description;
    const updatedCompleted = updateToDoItemDto.completed ?? todoItem.completed;


    const updatedToDoItem = await this.database.update(todosTable)
    .set({ title: updatedTitle, description: updatedDescription, completed: updatedCompleted })
    .where(eq(todosTable.id, id))
    .returning({
      id: todosTable.id,
      title: todosTable.title,
      description: todosTable.description,
      completed: todosTable.completed,
      userId: todosTable.userId,
      createdAt: todosTable.createdAt,
    })
    .execute()
    .then(todos => todos[0]);
    
    return updatedToDoItem;   // Return the updated ToDoItem
  }


  // Method to delete all ToDoItems per userId
  async deleteAllToDosPerUser(userId: number): Promise<void> {
    await this.database.
    delete(todosTable)
    .execute();
  }


  // Method to delete a ToDoItem by ID
  async deleteToDoItemById(id: number): Promise<void> {
    await this.database.delete(todosTable)
    .where(eq(todosTable.id, id))
    .execute();
  }

}
