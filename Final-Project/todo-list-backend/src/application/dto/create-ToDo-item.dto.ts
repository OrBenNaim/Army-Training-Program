import { IsString, IsNotEmpty, IsBoolean } from 'class-validator';

export class CreateToDoItemDto {
    @IsString()
    @IsNotEmpty()
    title: string;

    @IsString()
    description: string;
}
