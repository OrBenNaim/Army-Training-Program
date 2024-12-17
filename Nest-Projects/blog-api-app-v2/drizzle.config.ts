import { defineConfig } from "drizzle-kit";

export default defineConfig({
  schema: "./src/drizzle/schema.ts", // Path to the schema file
  out: "./drizzle", // Path to store migrations
  driver: "pglite", // PostgreSQL driver
  dbCredentials: {
    connectionString: process.env.DATABASE_URL as string
  },
  verbose: true,
  strict: true
});
