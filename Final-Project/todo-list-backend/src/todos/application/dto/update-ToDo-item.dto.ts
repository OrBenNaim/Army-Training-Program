import { IsString, IsNotEmpty, IsBoolean, IsOptional } from 'class-validator';

export class UpdateToDoItemDto {
    @IsOptional()
    @IsString()
    title: string=null;     // Default value for title is null when ToDoList is updated

    @IsOptional()
    @IsString()
    description: string;

    @IsOptional()
    @IsBoolean()
    completed: boolean=null;
}
