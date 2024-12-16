import { Module } from '@nestjs/common';
import { BlogModule } from './blog/blog.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    BlogModule,
    ConfigModule.forRoot({
      isGlobal: true, // Makes ConfigModule available globally
    })
  ]
})
export class AppModule {}