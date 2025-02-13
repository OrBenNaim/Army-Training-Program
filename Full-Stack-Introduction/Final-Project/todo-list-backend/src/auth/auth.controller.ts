import { Controller, Post, Body, Param, } from '@nestjs/common';
import { AuthDto } from 'src/auth/dto/auth.dto'; 
import { AuthService } from './auth.srevice';


@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService) {}    

    @Post('signup')
    async signup(@Body() signUpDto: AuthDto) {
        try {
            return await this.authService.signUp(signUpDto);
        }
        catch (error) {
            console.log(error);
            return error;
        }
    }


    @Post('signin')
    async signIn(@Body() signInDto: AuthDto) {
        try {
            return await this.authService.signIn(signInDto);
        }
        catch (error) {
            console.log(error);
            return error;
        }
    }
}

    