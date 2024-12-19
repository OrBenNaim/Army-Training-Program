import * as schema from 'src/infrastrucature/database/schema'

export type Blog = typeof schema.blogs.$inferSelect;   // For selecting data


