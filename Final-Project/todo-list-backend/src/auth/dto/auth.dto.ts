import { IsString, IsNotEmpty, IsNumber, IsDate } from 'class-validator';

export class AuthDto {
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
