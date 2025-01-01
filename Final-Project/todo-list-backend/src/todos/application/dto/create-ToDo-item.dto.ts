import { IsString, IsNotEmpty, IsBoolean, IsOptional } from 'class-validator';
import { Transform } from 'class-transformer';

export class CreateToDoItemDto {
    @IsString()
    @IsNotEmpty()
    title: string;

    @IsOptional()
    @IsString()
    description: string = "";       // Default value for description is "" when ToDoList is created

    @IsOptional()
    @IsBoolean()   
    completed?: boolean = false;    // Default value for completed is false when ToDoList is created
}
