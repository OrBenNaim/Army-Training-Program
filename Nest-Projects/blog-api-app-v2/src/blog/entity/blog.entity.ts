import * as schema from 'src/database/schema'

export type Blog = typeof schema.blogs.$inferSelect;   // For selecting data


