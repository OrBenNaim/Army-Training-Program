export interface ToDoEntity {   
    id: number;             // Include id for unique identifier
    title: string;          // Include title for the name of the task 
    description: string;    // Include description for more details
    completed: boolean;     // Include completed for status
    userId: number;         // Include userId for foreign key relation
    createdAt: Date;        // Include createdAt for timestamp
}
