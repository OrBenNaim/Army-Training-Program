import { pgTable, serial, text } from "drizzle-orm/pg-core";

export const blogs = pgTable('blogs', {
    id: serial('id').primaryKey(),
    title: text('title').unique().notNull(),
    content: text('content').notNull(),
});