import { Module } from '@nestjs/common';
import { BlogController } from './blog.controller';
import { BlogService } from './blog.service';
import { ConfigModule } from '@nestjs/config';
import { DbModule } from 'src/database/db.module'; 


@Module({
  imports: [DbModule],
  controllers: [BlogController],
  providers: [BlogService]
})
export class BlogModule {}
