import { Injectable, Inject, NotFoundException } from '@nestjs/common';
import { ToDoListRepository } from './ToDoList-repository-interface';
import { ToDoListEntity } from '../../domain/entities/ToDoList.entity';
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
  async createToDoList(toDoList: ToDoListEntity): Promise<string> {
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
  async getToDoLists(): Promise<ToDoListEntity[]> {
      const results = await this.database.select().from(ToDoListSchema).execute();
      
      if(!results.length) {
        throw new NotFoundException("There are no existing ToDo Lists yet.");
      }
      
      return results.map(row => new ToDoListEntity(row.id, row.title, row.description, row.completed));
  }


  // Method to retrieve specific ToDoList by ID
  async getToDoListById(id: number): Promise<ToDoListEntity> {
    const result = await this.database.select().from(ToDoListSchema).where(eq(ToDoListSchema.id, id)).execute();
    
    const todoList = result.length ? new ToDoListEntity(result[0].id, result[0].title, result[0].description, result[0].completed) : null;

    if(!todoList) {
      throw new NotFoundException(`ToDoList with ID ${id} not found.`);
    }

    return todoList;
  }


  // Method to update a ToDoList by ID
  async updateToDoListById(id: number, title: string, description: string): Promise<string> {
    const todoList = await this.getToDoListById(id);
    
    if (!todoList) {
      throw new NotFoundException(`ToDoList with ID ${id} not found.`);
    }
    
    await this.database.update(ToDoListSchema)
    .set({ title: title, description: description })
    .where(eq(ToDoListSchema.id, id))
    .execute();

    return `ToDoList with ID ${id} updated successfully.`;

  }


  // Method to delete all ToDoLists
  async deleteAllToDoLists(): Promise<string> {
    await this.database.delete(ToDoListSchema).execute();
    return "All ToDoLists deleted successfully.";
  }


  // Method to delete a ToDoList by ID
  async deleteToDoListById(id: number): Promise<string> {
    const todoList = await this.getToDoListById(id);
    
    if (!todoList) {
          throw new NotFoundException(`ToDoList with ID ${id} not found.`);
    }
    
    await this.database.delete(ToDoListSchema).where(eq(ToDoListSchema.id, id)).execute();

    return `ToDoList with ID ${id} deleted successfully.`;
  }

}
