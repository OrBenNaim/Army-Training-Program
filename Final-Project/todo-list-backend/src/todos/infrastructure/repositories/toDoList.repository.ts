import { Injectable, Inject, NotFoundException, ConflictException } from '@nestjs/common';
import { ToDoListRepositoryInterface } from './toDoList.repository-interface';
import { ToDoItemEntity } from '../../domain/entity/ToDoItem.entity';
import * as schema from 'src/database/schema';
import { ToDoItemSchema } from 'src/database/schema';
import { DATABASE_CONNECTION } from 'src/database/db-connection';
import { NodePgDatabase } from 'drizzle-orm/node-postgres';
import { eq, not, and } from 'drizzle-orm';
import { ConfigService } from '@nestjs/config';
import { CreateToDoItemDto } from 'src/todos/application/dto/create-ToDo-item.dto';



@Injectable()
export class ToDoListRepository implements ToDoListRepositoryInterface {
  constructor(
    @Inject(DATABASE_CONNECTION) private readonly database: NodePgDatabase<typeof schema>,
        private readonly configService: ConfigService
  ) {}


  // Method to create a new ToDoItem
  async createToDoItem(createToDoItemDto: CreateToDoItemDto): Promise<ToDoItemEntity> {

    
    // Check if the new title already exists in the database in another ToDoItem
    const result = await this.database
    .select()
    .from(ToDoItemSchema)
    .where(eq(ToDoItemSchema.title, createToDoItemDto.title)).execute();

    if (result.length) {
      
      throw new ConflictException(`ToDo Item with title '${createToDoItemDto.title}' is already exists.`);
    }
      
    const data = await this.database.insert(ToDoItemSchema)
    .values({ 
      title: createToDoItemDto.title, 
      description: createToDoItemDto.description, 
      completed: createToDoItemDto.completed 
    })
    .returning({
      id: ToDoItemSchema.id,
      title: ToDoItemSchema.title,
      description: ToDoItemSchema.description,
      completed: ToDoItemSchema.completed
    })

    return data[0];   // Return the newly created ToDoItem
  }


  // Method to retrieve all ToDoItems
  async getAllToDoItems(): Promise<ToDoItemEntity[]> {
      const list_of_ToDoItems = await this.database.select().from(ToDoItemSchema).execute();
      return list_of_ToDoItems;
  }


  // Method to retrieve specific ToDoItem by ID
  async getToDoItemById(id: number): Promise<ToDoItemEntity> {
    const list_of_ToDoItems = await this.database.select().from(ToDoItemSchema).where(eq(ToDoItemSchema.id, id)).execute();
    
    /* list_of_ToDoItems[0] is the first element of the array, 
    which is the ToDoItem and should be the only element in the array. */

    if (!list_of_ToDoItems[0])  
    {
      throw new NotFoundException(`ToDo Item with ID ${id} not found.`);
    }
    return list_of_ToDoItems[0];
  }


  // Method to update a ToDoItem by ID
  async updateToDoItemById(id: number, title: string, description: string, completed: boolean): Promise<ToDoItemEntity> {
  
    const todoItem = await this.getToDoItemById(id);

    // Check if the new title already exists in the database in another ToDoItem
    const result = await this.database
    .select()
    .from(ToDoItemSchema)
    .where(and(eq(ToDoItemSchema.title, title), not(eq(ToDoItemSchema.id, id)))).execute();

    if (result.length) {
      throw new ConflictException(`ToDo Item with title '${title}' is already exists.`);
    }

    // Update only if the new value is not null
    const updatedTitle = title !== undefined ? title : todoItem.title;
    const updatedDescription = description !== undefined ? description : todoItem.description;
    const updatedCompleted = completed !== undefined ? completed : todoItem.completed;


    const updatedToDoItem = await this.database.update(ToDoItemSchema)
    .set({ title: updatedTitle, description: updatedDescription, completed: updatedCompleted })
    .where(eq(ToDoItemSchema.id, id))
    .returning({
      id: ToDoItemSchema.id,
      title: ToDoItemSchema.title,
      description: ToDoItemSchema.description,
      completed: ToDoItemSchema.completed
    })
    
    return updatedToDoItem[0];   // Return the updated ToDoItem
  }


  // // Method to delete all ToDoItems
  // async deleteAllToDoItems(): Promise<ToDoDbType[]> {
  //   return await this.database.delete(ToDoItemSchema).returning().execute();
  //   //return "All ToDo Items deleted successfully.";
  // }


  // // Method to delete a ToDoItem by ID
  // async deleteToDoItemById(id: number): Promise<string> {
  //   const todoItem = await this.getToDoItemById(id);
    
  //   if (!todoItem) {
  //     throw new NotFoundException(`ToDoList with ID ${id} not found.`);
  //   }
    
  //   await this.database.delete(ToDoItemSchema).where(eq(ToDoItemSchema.id, id)).execute();

  //   return `ToDo Item with ID ${id} deleted successfully.`;
  // }

}
