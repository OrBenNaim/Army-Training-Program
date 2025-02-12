import { Module } from '@nestjs/common';
import { BlogController } from './blog.controller';
import { BlogService } from './blog.service';
import { ConfigModule } from '@nestjs/config';

@Module({
  controllers: [BlogController],
  providers: [BlogService]
})
export class BlogModule {}
