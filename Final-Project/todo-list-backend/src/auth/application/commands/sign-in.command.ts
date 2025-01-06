import { SignInDto } from 'src/auth/application/dto/sign-in.dto';  
import { ICommand } from '@nestjs/cqrs';

export class SignInCommand implements ICommand {    
    constructor(public readonly signInDto: SignInDto) {}
} 
  