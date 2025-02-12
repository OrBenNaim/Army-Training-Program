import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Enable CORS
  app.enableCors({
    origin: 'http://localhost:5173', // Frontend URL
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true, // Allow cookies and credentials
  });

  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,                // Enables property transformation
      whitelist: true,                // Removes properties not defined in the DTO
      forbidNonWhitelisted: true,     // Rejects extra properties in the request body
      transformOptions: {
        enableImplicitConversion: false, // Allows implicit type conversion
      },
    }),
  );

  await app.listen(process.env.PORT ?? 3000);

  console.log('Server is running on: http://localhost:3000');
}

bootstrap();
