import { Injectable, Inject, NotFoundException, ConflictException } from '@nestjs/common';
import { ToDosRepositoryInterface } from './toDos.repository-interface';
import { ToDoEntity } from '../../domain/entity/ToDo.interface';
import * as schema from 'src/database/schemas/todos';
import { todosTable } from 'src/database/schemas/todos';
import { DATABASE_CONNECTION } from 'src/database/db-connection';
import { NodePgDatabase } from 'drizzle-orm/node-postgres';
import { eq, not, and } from 'drizzle-orm';
import { ConfigService } from '@nestjs/config';
import { CreateToDoItemDto } from 'src/todos/application/dto/create-ToDo-item.dto';
import { create } from 'domain';



@Injectable()
export class ToDosRepository implements ToDosRepositoryInterface {
  constructor(
    @Inject(DATABASE_CONNECTION) private readonly database: NodePgDatabase<typeof schema>,
        private readonly configService: ConfigService
  ) {}


  // Method to create a new ToDoItem
  async createToDoItem(createToDoItemDto: CreateToDoItemDto, userID: number): Promise<ToDoEntity> {

    // Check if the new title already exists in the database in another ToDoItem
    const result = await this.database
    .select()
    .from(todosTable)
    .where(eq(todosTable.title, createToDoItemDto.title)).execute();

    if (result.length) {
      throw new ConflictException(`ToDo Item with title '${createToDoItemDto.title}' is already exists.`);
    }
      
    const data = await this.database.insert(todosTable)
    .values({ 
      title: createToDoItemDto.title, 
      description: createToDoItemDto.description, 
      completed: createToDoItemDto.completed,
      userId: userID,  // Add the userId to the new ToDoItem
      
    })
    .returning({
      id: todosTable.id,
      title: todosTable.title,
      description: todosTable.description,
      completed: todosTable.completed,
      userId: todosTable.userId,
      createdAt: todosTable.createdAt,
    })

    return data[0];   // Return the newly created ToDoItem
  }


  // Method to retrieve all ToDoItems
  async getAllToDoItems(): Promise<ToDoEntity[]> {
      const list_of_ToDoItems = await this.database.select().from(todosTable).execute();
      return list_of_ToDoItems;
  }


  // Method to retrieve specific ToDoItem by ID
  async getToDoItemById(id: number): Promise<ToDoEntity> {
    const list_of_ToDoItems = await this.database.select().from(todosTable).where(eq(todosTable.id, id)).execute();
    
    /* list_of_ToDoItems[0] is the first element of the array, 
    which is the ToDoItem and should be the only element in the array. */

    if (!list_of_ToDoItems[0])  
    {
      throw new NotFoundException(`ToDo Item with ID ${id} not found.`);
    }
    return list_of_ToDoItems[0];
  }


  // Method to update a ToDoItem by ID
  async updateToDoItemById(id: number, title: string, description: string, completed: boolean): Promise<ToDoEntity> {
  
    const todoItem = await this.getToDoItemById(id);

    // Check if the new title already exists in the database in another ToDoItem
    const result = await this.database
    .select()
    .from(todosTable)
    .where(and(eq(todosTable.title, title), not(eq(todosTable.id, id)))).execute();

    if (result.length) {
      throw new ConflictException(`ToDo Item with title '${title}' is already exists.`);
    }

    // Update only if the new value is not null
    const updatedTitle = title !== null ? title : todoItem.title;
    const updatedDescription = description !== null ? description : todoItem.description;
    const updatedCompleted = completed !== null ? completed : todoItem.completed;


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
    
    return updatedToDoItem[0];   // Return the updated ToDoItem
  }


  // Method to delete all ToDoItems
  async deleteAllToDoItems(): Promise<void> {
    await this.database.delete(todosTable).execute();
  }


  // Method to delete a ToDoItem by ID
  async deleteToDoItemById(id: number): Promise<void> {
    const todoItem = await this.getToDoItemById(id);
    await this.database.delete(todosTable).where(eq(todosTable.id, id)).execute();
  }

}
