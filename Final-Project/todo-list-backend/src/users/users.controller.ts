import { Controller, Post, Body, Get, Delete, Param, Put, ValidationPipe } from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';


@Controller('users')
export class UsersController {
    
}