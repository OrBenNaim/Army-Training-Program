import { pgTable, unique, uuid, varchar, timestamp } from "drizzle-orm/pg-core";

export const fleetsTable = pgTable("fleets", {
    id: uuid("id").defaultRandom().primaryKey().notNull(), // Unique identifier for the fleet

    name: varchar("name", { length: 255 }).notNull(), // Name of the fleet

    createdAt: timestamp("createdAt").defaultNow().notNull(), // Date and time when the fleet was created

}, (table) => [
    unique("fleets_name_unique").on(table.name),
]);
