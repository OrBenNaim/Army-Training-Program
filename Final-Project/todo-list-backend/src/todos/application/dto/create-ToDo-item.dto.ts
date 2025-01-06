import { IsString, IsNotEmpty, IsBoolean, IsOptional, IsNumber } from 'class-validator';
import { Transform } from 'class-transformer';

export class CreateToDoItemDto {
    @IsString()
    @IsNotEmpty()
    title: string;

    @IsOptional()
    @IsString()
    @Transform(({ value }) => value === null ? "" : value)  // If description is null, set it to ""
    description: string = "";       // Default value for description is "" if description is not provided

    @IsOptional()
    @IsBoolean()
    @Transform(({ value }) => value === null ? false : value)  // If completed is null, set it to false 
    completed: boolean = false;    // Default value for completed is false if completed is not provided

    @IsNumber()
    @IsNotEmpty()
    userId: number;     // Include userId for foreign key relation
}
