import { IsString, IsNotEmpty, IsBoolean } from 'class-validator';

export class ToDoListDto {
    @IsString()
    @IsNotEmpty()
    title: string;

    @IsString()
    description: string;
}
