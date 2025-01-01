import { ToDoItemSchema } from "src/database/schema";

export type ToDoDbType = typeof ToDoItemSchema.$inferSelect;