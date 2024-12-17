import { pgTable, unique, serial, text } from "drizzle-orm/pg-core"
import { sql } from "drizzle-orm"



export const blogs = pgTable("blogs", {
	id: serial().primaryKey().notNull(),
	title: text().notNull(),
	content: text().notNull(),
}, (table) => [
	unique("blogs_title_unique").on(table.title),
]);
