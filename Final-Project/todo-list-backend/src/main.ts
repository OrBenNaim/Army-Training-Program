import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

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

  console.log('Application is running on: http://localhost:3000');
}

bootstrap();
