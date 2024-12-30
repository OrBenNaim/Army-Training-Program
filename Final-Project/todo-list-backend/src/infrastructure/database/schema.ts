import { pgTable, unique, serial, text, boolean } from "drizzle-orm/pg-core"
import { sql } from "drizzle-orm"


export const toDoListSchema = pgTable("ToDoLists", {
	id: serial().primaryKey().notNull(),
	title: text().notNull(),
	description: text(),
	completed: boolean().default(false),
}, (table) => [
	unique("toDoLists_title_unique").on(table.title),
]);
