import { IsString, IsNotEmpty } from 'class-validator';

export class CreateFleetDto {
    @IsString()
    @IsNotEmpty()
    name: string;
}

