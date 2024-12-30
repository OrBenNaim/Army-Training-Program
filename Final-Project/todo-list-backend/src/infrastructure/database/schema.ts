import { pgTable, unique, serial, text } from "drizzle-orm/pg-core"
import { sql } from "drizzle-orm"


export const toDoListSchema = pgTable("toDoLists", {
	id: serial().primaryKey().notNull(),
	title: text().notNull(),
	content: text().notNull(),
}, (table) => [
	unique("toDoLists_title_unique").on(table.title),
]);
