import { defineConfig } from 'drizzle-kit'

export default defineConfig({
    schema: "./src/drizzle/schema.ts",
    dialect: 'postgresql'
})