import { Global, Module } from '@nestjs/common';
import { DATABASE_CONNECTION } from './db-connection';
import { ConfigService, ConfigModule } from '@nestjs/config';
import { Pool } from 'pg';
import { drizzle } from 'drizzle-orm/node-postgres';


@Global() // Mark this module as global
@Module({
    imports: [ ConfigModule ],
    providers: [
        {
            provide: DATABASE_CONNECTION,
            useFactory: async (configService: ConfigService) => {
                const pool = new Pool({
                    connectionString: configService.getOrThrow('DATABASE_URL'),
                });
                return drizzle(pool, {
                    schema: {},
                });
            },
            inject: [ConfigService],
        },
    ],
    exports: [DATABASE_CONNECTION],
})
export class DatabaseModule { }
