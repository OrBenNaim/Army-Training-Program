import { InferModel } from 'drizzle-orm';
import * as schema from 'drizzle/schema'

export type Blog = typeof schema.blogs.$inferSelect;   // For selecting data



// export class Blog {
//     id: number;     // Unique ID for each blog
//     title: string;
//     content: string;
// }
