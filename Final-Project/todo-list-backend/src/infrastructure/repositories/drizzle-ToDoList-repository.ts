import { Injectable, Inject, NotFoundException, ConflictException } from '@nestjs/common';
import { ToDoListRepository } from './ToDoList-repository-interface';
import { ToDoItemEntity } from '../../domain/entities/ToDoItem.entity';
import * as schema from 'src/infrastructure/database/schema';
import { ToDoItemSchema } from 'src/infrastructure/database/schema';
import { DATABASE_CONNECTION } from '../database/db-connection';
import { NodePgDatabase } from 'drizzle-orm/node-postgres';
import { eq, not, and } from 'drizzle-orm';
import { ConfigService } from '@nestjs/config';



@Injectable()
export class DrizzleToDoListRepository implements ToDoListRepository {
  constructor(
    @Inject(DATABASE_CONNECTION) private readonly database: NodePgDatabase<typeof schema>,
        private readonly configService: ConfigService
  ) {}


  // Method to create a new ToDoItem
  async createToDoItem(toDoItem: ToDoItemEntity): Promise<string> {
    
    // If the title is null, throw a ConflictException
    if (toDoItem.title === null || toDoItem.title.trim() === '') {
      throw new ConflictException("Title is required.");
    }

    // Check if the new title already exists in the database in another ToDoItem
    const result = await this.database
    .select()
    .from(ToDoItemSchema)
    .where(eq(ToDoItemSchema.title, toDoItem.title)).execute();

    if (result.length) {
      throw new ConflictException(`ToDo Item with title '${toDoItem.title}' is already exists.`);
    }
      
    const temp_description = toDoItem.description !== null ? toDoItem.description : null;

    await this.database.insert(ToDoItemSchema)
    .values({ 
      title: toDoItem.title, 
      description: temp_description, 
      completed: toDoItem.completed 
    })
    .execute();

    return "ToDo Item created successfully.";
  }


  // Method to retrieve all ToDoItems
  async getAllToDoItems(): Promise<ToDoItemEntity[]> {
      const results = await this.database.select().from(ToDoItemSchema).execute();
      
      if(!results.length) {
        throw new NotFoundException("There are no existing ToDo Items yet.");
      }
      
      return results.map(row => new ToDoItemEntity(row.id, row.title, row.description, row.completed));
  }


  // Method to retrieve specific ToDoItem by ID
  async getToDoItemById(id: number): Promise<ToDoItemEntity> {
    const result = await this.database.select().from(ToDoItemSchema).where(eq(ToDoItemSchema.id, id)).execute();
    
    const todoItem = result.length ? new ToDoItemEntity(result[0].id, result[0].title, result[0].description, result[0].completed) : null;

    if(!todoItem) {
      throw new NotFoundException(`ToDo Item with ID ${id} not found.`);
    }

    return todoItem;
  }


  // Method to update a ToDoItem by ID
  async updateToDoItemById(id: number, title: string | null, description: string | null): Promise<string> {
    const todoItem = await this.getToDoItemById(id);
    
    if (!todoItem) {
      throw new NotFoundException(`ToDo Item with ID ${id} not found.`);
    }

    // Check if the new title already exists in the database in another ToDoItem
    const result = await this.database
    .select()
    .from(ToDoItemSchema)
    .where(and(eq(ToDoItemSchema.title, title), not(eq(ToDoItemSchema.id, id)))).execute();

    if (result.length) {
      throw new ConflictException(`ToDo Item with title '${title}' is already exists.`);
    }

    // Update only if the new value is not null
    const updatedTitle = title !== null ? title : todoItem.title;
    const updatedDescription = description !== null ? description : todoItem.description;


    await this.database.update(ToDoItemSchema)
    .set({ title: updatedTitle, description: updatedDescription })
    .where(eq(ToDoItemSchema.id, id))
    .execute();
   
    return `ToDo Item with ID ${id} updated successfully.`;
  }


  // Method to delete all ToDoItems
  async deleteAllToDoItems(): Promise<string> {
    await this.database.delete(ToDoItemSchema).execute();
    return "All ToDo Items deleted successfully.";
  }


  // Method to delete a ToDoItem by ID
  async deleteToDoItemById(id: number): Promise<string> {
    const todoItem = await this.getToDoItemById(id);
    
    if (!todoItem) {
          throw new NotFoundException(`ToDoList with ID ${id} not found.`);
    }
    
    await this.database.delete(ToDoItemSchema).where(eq(ToDoItemSchema.id, id)).execute();

    return `ToDo Item with ID ${id} deleted successfully.`;
  }

}
