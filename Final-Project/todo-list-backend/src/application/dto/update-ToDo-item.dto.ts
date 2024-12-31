import { IsString, IsNotEmpty, IsBoolean } from 'class-validator';

export class UpdateToDoItemDto {
    @IsString()
    title: string;

    @IsString()
    description: string;
}
