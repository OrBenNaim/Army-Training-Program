import { pgTable, unique, serial, text, boolean, timestamp  } from "drizzle-orm/pg-core"
import { sql } from "drizzle-orm"

export const usersTable = pgTable("users", {
	id: serial().primaryKey().notNull(),
	username: text().notNull(),
	password: text("hashed_password").notNull(),
    createdAt: timestamp("created_at").defaultNow(), 	// Timestamp for creation
}, (table) => [
	unique("users_username_unique").on(table.username),
]);