import { Module } from '@nestjs/common';
import { BlogModule } from './blog/blog.module';
import { ConfigModule } from '@nestjs/config';
import { DbModule } from './database/db.module';

@Module({
  imports: [
    BlogModule,
    ConfigModule.forRoot({ isGlobal: true}),  // Makes ConfigModule available globally
    DbModule,
  ]
})
export class AppModule {}
