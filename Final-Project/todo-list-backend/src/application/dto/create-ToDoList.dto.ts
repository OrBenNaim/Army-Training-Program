import { IsString, IsEmail, IsNotEmpty, Length } from 'class-validator';

export class CreateToDoListDto {
    @IsString()
    @IsNotEmpty()
    title: string;

    @IsString()
    @IsNotEmpty()
    content: string;
}
