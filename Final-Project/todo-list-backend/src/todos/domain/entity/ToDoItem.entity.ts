export interface ToDoItemEntity {   
    id: number;
    title: string;
    description: string;
    completed: boolean;
}

// export class ToDoItemEntity {
    
//     constructor(
//         public readonly id: number,
//         public title: string,
//         public description: string,  // Default value for description is "" when ToDoList is created
//         public completed: boolean           // Default value for completed is false when ToDoList is created
//     ){}

// //     updateTitle(newTitle: string): void {
// //         if (!newTitle || newTitle.trim().length === 0) {
// //           throw new Error('Title cannot be empty');
// //         }
// //         this.title = newTitle;
// //     }

// //     updateDescription(newDescription: string): void {
// //         this.description = newDescription;
// //     }

// //     toggleCompleted(): void {
// //         this.completed = !this.completed;
// //     }
// } 