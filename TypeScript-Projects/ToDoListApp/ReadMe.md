Description: Create a TypeScript application that allows users to mange their to-do lists. The app should have the following features:
    
    1. Task List: Display a list of tasks that the user has created.
    2. Add Task: Allow the user to add new tasks to the list.
    3. Edit Task: Enable the user to edit existing tasks. 
    4. Delete Task: Permit the user to delete tasks from the list.
    5. Task Status: Allow the user to mark tasks as completed or incomplete.

Requirements:

    1. Create a Task interface with the following properties: id, title, description, completed.
    2. Create a TaskList class that stores an array of Task objects.
    3. Implement methods for adding, editing, add deleting tasks from the list.
    4. Create a main function that initializes the task list and provides a user interface for interacting with the app.
    5. Use TypeScript features such as classes, interface, and generic to implement the app.

Example of output:

    To-Do List App

    Tasks:
        - Buy milk
        - walk the dog
        - finish homework
    
    Enter a command:
        (A)dd task
        (E)dit task
        (D)elete task
        (Q)uit


- The user should press 'A' to choose the 'Add task' option.
- The user should press 'E' to choose the 'Edit task' option.
- The user should press 'D' to choose the 'Delete' task' option.
- The user should press 'Q' to choose the 'Quit' option.