export class ToDoListEntity {
    constructor(
        public readonly id: number,
        public title: string,
        public description: string,
        public completed: boolean
    ){}

    updateTitle(newTitle: string): void {
        if (!newTitle || newTitle.trim().length === 0) {
          throw new Error('Title cannot be empty');
        }
        this.title = newTitle;
    }

    updateDescription(newDescription: string): void {
        this.description = newDescription;
    }

    toggleCompleted(): void {
        this.completed = !this.completed;
    }
} 