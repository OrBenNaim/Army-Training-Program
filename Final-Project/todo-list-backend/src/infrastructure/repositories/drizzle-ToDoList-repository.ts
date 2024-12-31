import { Injectable, Inject, NotFoundException } from '@nestjs/common';
import { ToDoListRepository } from './ToDoList-repository-interface';
import { ToDoItemEntity } from '../../domain/entities/ToDoItem.entity';
import * as schema from 'src/infrastructure/database/schema';
import { ToDoListSchema } from 'src/infrastructure/database/schema';
import { DATABASE_CONNECTION } from '../database/db-connection';
import { NodePgDatabase } from 'drizzle-orm/node-postgres';
import { eq } from 'drizzle-orm';
import { ConfigService } from '@nestjs/config';



@Injectable()
export class DrizzleToDoListRepository implements ToDoListRepository {
  constructor(
    @Inject(DATABASE_CONNECTION) private readonly database: NodePgDatabase<typeof schema>,
        private readonly configService: ConfigService
  ) {}


  // Method to create a new ToDoList
  async createToDoItem(toDoList: ToDoItemEntity): Promise<string> {
    if (toDoList.id) {
      await this.database.update(ToDoListSchema)
      .set({ title: toDoList.title, description: toDoList.description, completed: toDoList.completed})
      .where(eq(ToDoListSchema.id, toDoList.id))
      .execute();
    } 
    else {
      await this.database.insert(ToDoListSchema)
      .values({ title: toDoList.title, description: toDoList.description, completed: toDoList.completed })
      .execute();
    }

    return "ToDoList created successfully.";
  }


  // Method to retrieve all ToDoLists
  async getAllToDoItems(): Promise<ToDoItemEntity[]> {
      const results = await this.database.select().from(ToDoListSchema).execute();
      
      if(!results.length) {
        throw new NotFoundException("There are no existing ToDo Lists yet.");
      }
      
      return results.map(row => new ToDoItemEntity(row.id, row.title, row.description, row.completed));
  }


  // Method to retrieve specific ToDoList by ID
  async getToDoItemById(id: number): Promise<ToDoItemEntity> {
    const result = await this.database.select().from(ToDoListSchema).where(eq(ToDoListSchema.id, id)).execute();
    
    const todoList = result.length ? new ToDoItemEntity(result[0].id, result[0].title, result[0].description, result[0].completed) : null;

    if(!todoList) {
      throw new NotFoundException(`ToDoList with ID ${id} not found.`);
    }

    return todoList;
  }


  // Method to update a ToDoList by ID
  async updateToDoItemById(id: number, title: string | null, description: string | null): Promise<string> {
    const todoList = await this.getToDoItemById(id);
    
    if (!todoList) {
      throw new NotFoundException(`ToDoList with ID ${id} not found.`);
    }

    // Update only if the new value is not null
    const updatedTitle = title !== null ? title : todoList.title;
    const updatedDescription = description !== null ? description : todoList.description;
    
    try {
      await this.database.update(ToDoListSchema)
      .set({ title: updatedTitle, description: updatedDescription })
      .where(eq(ToDoListSchema.id, id))
      .execute();
    } 
    catch (error) {
      throw new Error("An error occurred while updating the ToDoList.");
    } 

    return `ToDoList with ID ${id} updated successfully.`;

  }


  // Method to delete all ToDoLists
  async deleteAllToDoItems(): Promise<string> {
    await this.database.delete(ToDoListSchema).execute();
    return "All ToDoLists deleted successfully.";
  }


  // Method to delete a ToDoList by ID
  async deleteToDoItemById(id: number): Promise<string> {
    const todoList = await this.getToDoItemById(id);
    
    if (!todoList) {
          throw new NotFoundException(`ToDoList with ID ${id} not found.`);
    }
    
    await this.database.delete(ToDoListSchema).where(eq(ToDoListSchema.id, id)).execute();

    return `ToDoList with ID ${id} deleted successfully.`;
  }

}
