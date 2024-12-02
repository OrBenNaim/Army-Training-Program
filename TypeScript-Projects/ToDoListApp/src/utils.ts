import * as readline from 'readline';


interface Task {
    id: number;
    title: string;
    description: string;
    completed: boolean;
}


class TaskList {
    // Constructor with a default values
    constructor(
        private arrOfTasks: Array<Task> = [],                   // This field describes an array of Task objects.
        private commandMenu: string = `Enter a command:       
        (A)dd task
        (E)dit task
        (D)elete task
        (Q)uit\n`        
    ) {}


    // Display list and the command menu
    displayList(): void {
        console.log("\n-------------------- To-DO List App --------------------\n\nTasks:");
        
        // Display the tasks:
        if (this.arrOfTasks.length === 0){
            console.log("\tNo tasks available.");
        }
        this.arrOfTasks.forEach((element, index, array) => {
            const task = array[index];
            let taskStatus: string;
            
            if (task.completed){
                taskStatus = "Completed";
            }
            else{
                taskStatus = "Not completed yet";
            }
            
            if(task.description === "" || task.description === " "){
                console.log(`\t[Task ID: ${task.id}] ${task.title}: ${taskStatus}\n`)
            }
            else{
                console.log(`\t[Task ID: ${task.id}] ${task.title} - ${task.description}: ${taskStatus}\n`)
            }});
        console.log(`\n${this.commandMenu}`);
    }


    addTask(taskTitle: string, taskDescription: string): void {
        const task = {
            id: this.arrOfTasks.length + 1,
            title: taskTitle,
            description: taskDescription,
            completed: false    // Initially mark the task as incomplete.
        };

        // Check if this task already exists:
        for (let i = 0; i < this.arrOfTasks.length; i++) {
            if (this.arrOfTasks[i].title === taskTitle) return;
        }
        this.arrOfTasks.push(task);      // If the task isn't exists in the list, add it.
    }


    deleteTask(taskIndex: number): void{
        this.arrOfTasks.splice(taskIndex, 1);
        
        this.arrOfTasks.forEach((element) => element.id -= 1);
    }


    editTaskTitle(taskIndex: number, newTitle: string): void{
        this.arrOfTasks[taskIndex].title = newTitle;
    }

    
    editTaskDescription(taskIndex: number, newDescription: string): void{
        this.arrOfTasks[taskIndex].description = newDescription;
    }

    toggleStatusTask(taskIndex: number): void {
        this.arrOfTasks[taskIndex].completed = !this.arrOfTasks[taskIndex].completed;
    }


    len(): number{
        return this.arrOfTasks.length;
    }

    isEmpty(): boolean {
        return this.arrOfTasks.length === 0 ? true : false;
    }
}



//----------------------------- This class will handle the CLI -----------------------------
export class ListApp{
    
    constructor(
        private toDoList: TaskList = new TaskList(),
        private taskID: string = "",
        private taskTitle: string = "",
        private taskDescription: string = "",
        private editOperationID: string = ""
    ){}

    question(readLine: readline.Interface, query: string): Promise<string> {
        return new Promise((resolve) => {
            readLine.question(query, (answer) => {
                resolve(answer);
            });
        });
    }
    
    async run(){    // Handle the app
        
        const readLine = readline.createInterface({     // Importing 'readline' to handle user input from the console
        input: process.stdin,
        output: process.stdout
        });

        while(true){
            this.toDoList.displayList();
            const command = await this.question(readLine, 'Command: ');

                switch(command.toUpperCase()){    // Ensures case-insensitive command comparison
                    case 'A':
                        this.taskTitle = await this.question(readLine, '\nEnter task title (or press Enter to skip): ');
                        this.taskDescription = await this.question(readLine, '\nEnter task description (or press Enter to skip): ');
                        this.toDoList.addTask(this.taskTitle, this.taskDescription);
                    break;

                case 'E':
                    this.taskID = await this.question(readLine, '\nEnter task ID: ');

                    if(Number.isNaN(Number(this.taskID)) || Number(this.taskID) <= 0 || Number(this.taskID) > this.toDoList.len()){
                        console.log("Invalid task ID, please try again.");
                        await new Promise((resolve) => setTimeout(resolve, 1500));
                        continue;
                    }
                    
                    console.log(`\nOptions:\n1. edit task title\n2. edit task description\n3. toggle task status (completed or incomplete)\n4. cancel`);

                    this.editOperationID = await this.question(readLine, '\nChoose an option by its number: ');
                    
                    switch(this.editOperationID){
                        
                        case '1':   // Enter new task title
                            this.taskTitle = await this.question(readLine, '\nEnter new task title: ');
                            this.toDoList.editTaskTitle(Number(this.taskID) - 1, this.taskTitle);
                        break;  

                        case '2':   // Enter new task description 
                            this.taskDescription = await this.question(readLine, '\nEnter new task description: ');
                            this.toDoList.editTaskDescription(Number(this.taskID) - 1, this.taskDescription);
                        break;  

                        case '3':  // Toggle status task
                            this.toDoList.toggleStatusTask(Number(this.taskID) - 1);
                        break;

                        case '4': // cancel option - go back to the main menu
                        break;  // Do nothing and the main menu will be displayed

                        default:
                            console.log("Invalid command, please try again.");
                            await new Promise((resolve) => setTimeout(resolve, 1500));
                        break;
                    }
                break;

                case 'D':   // Delete Task
                    this.taskID = await this.question(readLine, '\nEnter task ID: ');
                    this.toDoList.deleteTask(Number(this.taskID) - 1);
                    break;

                case 'Q':   // Quit 
                    console.log("Goodbye!");
                    readLine.close();
                    return;

                default:    // Invalid command
                    console.log("Invalid command, please try again.");
                    await new Promise((resolve) => setTimeout(resolve, 1500));
                    break;
            }
        }
    }
        
    
}