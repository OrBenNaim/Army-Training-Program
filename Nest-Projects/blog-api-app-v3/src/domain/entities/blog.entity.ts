export class Blog {
    constructor(
        public readonly id: number,
        public title: string,
        public content: string
    ){}

    updateTitle(newTitle: string): void {
        if (!newTitle || newTitle.trim().length === 0) {
          throw new Error('Title cannot be empty');
        }
        this.title = newTitle;
    }

    updateContent(newContent: string): void {
        if (!newContent || newContent.trim().length === 0) {
          throw new Error('Content cannot be empty');
        }
        this.content = newContent;
      }
} 