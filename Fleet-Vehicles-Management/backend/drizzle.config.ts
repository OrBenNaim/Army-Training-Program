import { config } from 'dotenv';
import { defineConfig } from 'drizzle-kit';
import path from 'path';

// Load the .env file from the root directory
config({ path: path.resolve(__dirname, '../../.env') });

if (!process.env.DATABASE_URL) {
    throw new Error("DATABASE_URL is not set in the environment variables.");
}

export default defineConfig({
    schema: [
        './src/database/schemas/vehicles.ts', 
        './src/database/schemas/fleets.ts',
        './src/database/schemas/vehicleStatusHistory.ts',
    ],
    out: './drizzle',
    dialect: 'postgresql',
    dbCredentials: {
        url: process.env.DATABASE_URL,
    },
});
    
    /* 
    The drizzle.config.ts file is used to configure the Drizzle CLI. 
    It specifies the database schema files that we want to generate TypeScript types for. 
    The schema property is an array of paths to the schema files.
    The out property specifies the output directory where the generated types will be saved.
    The dialect property specifies the database dialect. 
    In this case, we are using PostgreSQL. 
    The dbCredentials property specifies the database URL. 
    We are using the DATABASE_URL environment variable to store the database URL. 
    The drizzle.config.ts file also loads the environment variables from the .env file located in the root directory. 
    The config function from the dotenv package is used to load the environment variables. 
    The drizzle.config.ts file exports a configuration object using the defineConfig function from the drizzle-kit package. 
    Step 5: Generate TypeScript Types 
    To generate TypeScript types from the database schema files, run the following command: 
    npx drizzle 
    This command will generate TypeScript types for the database schema files specified in the  drizzle.config.ts file. 
    The generated types will be saved in the drizzle directory.
    Step 6: Use TypeScript Types 
    Now that we have generated TypeScript types for the database schema files, we can use them in our application. 
    */