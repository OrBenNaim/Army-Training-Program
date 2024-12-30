import { Injectable, Inject, NotFoundException } from '@nestjs/common';
import { ToDoListsRepository } from './ToDoList-repository-interface';
import { ToDoListEntity } from '../../domain/entities/ToDoList.entity';
import { toDoListSchema } from '../database/schema';
import { DATABASE_CONNECTION } from '../database/db-connection';
import { NodePgDatabase } from 'drizzle-orm/node-postgres';
import * as schema from '../database/schema';
import { eq } from 'drizzle-orm';
import { ConfigService } from '@nestjs/config';



@Injectable()
export class DrizzleToDoListRepository implements ToDoListsRepository {
  constructor(
    @Inject(DATABASE_CONNECTION) private readonly database: NodePgDatabase<typeof schema>,
        private readonly configService: ConfigService
  ) {}


  // Method to create a new ToDoList
  async createToDoList(toDoList: ToDoListEntity): Promise<void> {
    if (toDoList.id) {
      await this.database.update(toDoListSchema).set({ title: toDoList.title, content: toDoList.content }).where(eq(toDoListSchema.id, toDoListSchema.id)).execute();
    } 
    else {
      await this.database.insert(toDoListSchema).values({ title: toDoList.title, content: toDoList.content }).execute();
    }
  }


  // Method to retrieve all ToDoLists
  async getToDoLists(): Promise<ToDoListEntity[]> {
      const results = await this.database.select().from(toDoListSchema).execute();
      return results.map(row => new ToDoListEntity(row.id, row.title, row.content));
  }


  // Method to retrieve specific ToDoList by ID
  async getToDoListById(id: number): Promise<ToDoListEntity> {
    const result = await this.database.select().from(toDoListSchema).where(eq(toDoListSchema.id, id)).execute();
    
    const todoList = result.length ? new ToDoListEntity(result[0].id, result[0].title, result[0].content) : null;

    if(!todoList) {
      throw new NotFoundException(`Blog with ID ${id} not found.`);
    }

    return todoList;
  }


  // Method to delete all ToDoLists
  async deleteAllToDoLists(): Promise<void> {
    await this.database.delete(toDoListSchema).execute();
  }


  // Method to delete a ToDoList by ID
  async deleteToDoListById(id: number): Promise<void> {
    const todoList = await this.getToDoListById(id);
    
    if (!todoList) {
          throw new NotFoundException(`Blog with ID ${id} not found.`);
    }
    
    await this.database.delete(toDoListSchema).where(eq(toDoListSchema.id, id)).execute();
  }

}
