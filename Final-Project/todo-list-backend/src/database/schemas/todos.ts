import { pgTable, unique, serial, text, boolean, integer, timestamp } from "drizzle-orm/pg-core"
import { sql } from "drizzle-orm"
import { usersTable } from "./users";

export const todosTable = pgTable("todos", {
	id: serial().primaryKey().notNull(),
	title: text().notNull(),
	description: text().notNull(),
	completed: boolean().notNull(),
	userId: integer("user_id").notNull().references(() => usersTable.id),	// Proper foreign key reference
	createdAt: timestamp("created_at").defaultNow(), 						// Timestamp for creation
}, (table) => [
	unique("todos_title_unique").on(table.title),
]);
