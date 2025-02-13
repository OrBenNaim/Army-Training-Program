import { IsString, IsNotEmpty } from 'class-validator';

export class FleetDto {
    @IsString()
    @IsNotEmpty()
    name: string;
}

