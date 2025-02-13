import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { DatabaseModule } from './database/db.module';
import { FleetModule } from './fleet/fleet.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true, }),  // Loads environment variables from a .env file into process.env
    DatabaseModule,       // Imports the DatabaseModule which sets up the database connection
    FleetModule,
  ],
})
export class AppModule {}
