import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { AuthController } from './auth.controller';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from './strategy';
import { PassportModule } from '@nestjs/passport';
import { AuthService } from './auth.srevice';


@Module({
    imports: [
      CqrsModule,               // Enables CQRS (Command Query Responsibility Segregation) pattern
      JwtModule.register({}),
      PassportModule,
    ],
    controllers: [AuthController],
    providers: [ JwtStrategy, AuthService ],
  
})
export class AuthModule {}
