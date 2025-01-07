import { IsString, IsNotEmpty, IsBoolean, IsOptional, IsNumber, IsDate } from 'class-validator';
import { Transform } from 'class-transformer';

export class SignInDto {
    @IsString()
    @IsNotEmpty()
    username: string;

    @IsString()
    @IsNotEmpty()
    password: string;
}


export class SignInResponseDto {
    @IsNumber()
    @IsNotEmpty()
    userId: number;

    @IsString()
    @IsNotEmpty()
    username: string;

    @IsDate()
    @IsNotEmpty()
    createdAt: Date;

    // Don't expose the password hash
}
