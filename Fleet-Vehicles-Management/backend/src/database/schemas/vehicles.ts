import { pgTable, serial, text, integer, boolean, unique, timestamp, } from "drizzle-orm/pg-core";
import { fleetsTable } from "./fleets";

// Vehicles Table
export const vehiclesTable = pgTable("vehicles", {
	id: serial().primaryKey().notNull(),
	licensePlate: text().notNull(),
	manufacturer: text().notNull(),
	model: text().notNull(),
	status: boolean().notNull(),
	createdAt: timestamp("createdAt").defaultNow(),
	updatedAt: timestamp("updatedAt").defaultNow(),
	fleetId: integer().notNull().references(() => fleetsTable.id), // Foreign Key to Fleets Table
}, (table) => [
	unique("vehicles_id_licensePlate_unique").on(table.id, table.licensePlate),
]);
