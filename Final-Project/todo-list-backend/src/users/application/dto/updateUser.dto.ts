import { IsString, IsNotEmpty, IsBoolean, IsOptional, IsNumber } from 'class-validator';

export class UpdateUserDto {
    @IsNotEmpty()
    @IsNumber()
    userId: number;     

    @IsOptional()
    @IsString()
    username?: string=null;

    @IsOptional()
    @IsString()
    password?: string=null;
}
