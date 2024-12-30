import { IsString, IsEmail, IsNotEmpty, Length, IsBoolean } from 'class-validator';

export class CreateToDoListDto {
    @IsString()
    @IsNotEmpty()
    title: string;

    @IsString()
    description: string;

    @IsBoolean()
    completed: boolean;
}
