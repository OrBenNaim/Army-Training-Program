import { Module } from '@nestjs/common';
import { BlogModule } from './blog/blog.module';
import { HttpModule } from '@nestjs/axios';

@Module({
  imports: [BlogModule, HttpModule]
})
export class AppModule {}
