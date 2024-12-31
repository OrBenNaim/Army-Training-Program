import { pgTable, unique, serial, text, boolean } from "drizzle-orm/pg-core"
import { sql } from "drizzle-orm"

export const ToDoListSchema = pgTable("ToDoList", {
	id: serial().primaryKey().notNull(),
	title: text().notNull(),
	description: text().notNull(),
	completed: boolean().notNull(),
}, (table) => [
	unique("toDoLists_title_unique").on(table.title),
]);

