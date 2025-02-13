import { pgTable, unique, serial, text, timestamp  } from "drizzle-orm/pg-core"

export const fleetsTable = pgTable("fleets", {
	id: serial().primaryKey().notNull(),
	name: text().notNull(),
    createdAt: timestamp("createdAt").defaultNow().notNull(), 	// Timestamp for creation

}, (table) => [
	unique("fleets_name_unique").on(table.name),
]);