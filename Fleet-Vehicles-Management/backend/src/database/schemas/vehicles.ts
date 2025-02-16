import { pgTable, uuid, varchar, boolean, unique, timestamp, } from "drizzle-orm/pg-core";
import { fleetsTable } from "./fleets";

// Vehicles Table
export const vehiclesTable = pgTable("vehicles", {
    id: uuid("id").defaultRandom().primaryKey().notNull(),

    licensePlate: varchar("licensePlate", { length: 20 }).notNull(),

    manufacturer: varchar("manufacturer", { length: 255 }).notNull(),

    model: varchar("model", { length: 255 }).notNull(),

    status: boolean().notNull(),

    createdAt: timestamp("createdAt").defaultNow().notNull(),

    updatedAt: timestamp("updatedAt").defaultNow().notNull(),

    fleetId: uuid("fleetId").notNull().references(() => fleetsTable.id),
	
}, (table) => [
    unique("vehicles_licensePlate_unique").on(table.licensePlate) // Enforce unique license plates
]);

