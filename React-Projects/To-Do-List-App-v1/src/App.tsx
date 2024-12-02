import { useState, useEffect } from 'react'
import './styles.css';

interface Task {
  id: number;
  title: string;
  completed: boolean;
}


function App(): JSX.Element {
  const [tasks, setTasks] = useState<Task[]>(() => {
    
    // Load tasks from local storage on initialization
    const savedTasks = localStorage.getItem('tasks');
    
    try {
      return savedTasks ? JSON.parse(savedTasks) : [];
    } 
    catch (error) {
      console.error("Failed to parse tasks from local storage:", error);
      return [];
    }

  });

  const [newTask, setNewTask] = useState('');

  // Save tasks to local storage whenever tasks change
  useEffect(() => {
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }, [tasks]);
  

  const handleAddTask = () => {
    
     // Prevent adding empty tasks
    if (newTask.trim() === "")
    {            
      alert("Task title cannot be empty.");
      return;
    } 

    // Prevent adding a task with the same title as an existing task
    if (tasks.some(task => task.title === newTask.trim())) {
      alert("A task with this title already exists.");
      return;
    }

    const task: Task = {
      id: Date.now(),         // Use a timestamp for unique IDs
      title: newTask.trim(),
      completed: false
    };

    setTasks([...tasks, task]);   // Add the new task to the list
    setNewTask('');               // Clear input after adding
  };
  
  const handleRemoveTask = (taskToRemove: Task) => {
    if (!tasks.some((task) => task.id === taskToRemove.id)) {
      console.warn(`Task with id ${taskToRemove.id} not found.`);
      return;
    }
    
    setTasks(tasks.filter((task) => task.id !== taskToRemove.id));
  }; 

  const handleToggleCompleted = (taskToToggle: Task) => {
    setTasks(tasks.map((task) => 
      task.id === taskToToggle.id ? {...task, completed: !task.completed} : task
    ));
  }; 

  return (
    <div>
      <h1>To-Do List App</h1>
      <input 
        type="text"
        value={newTask}
        onChange={(e) => setNewTask(e.target.value)}
        placeholder='Enter new task'
        aria-label="New task input"
      />
      <button onClick={handleAddTask} aria-label="Add new task">Add Task</button>
      <ul>
        {tasks.length === 0 && <p>No tasks yet. Add some!</p>}
        {tasks.map((task: Task) => (
          <li key={task.id} className={task.completed ? 'completed' : ''}>
            <input 
              type='checkbox'
              checked={task.completed}
              onChange={() => handleToggleCompleted(task)}
            />
            <span>{task.title}</span>
            <button onClick={() => handleRemoveTask(task)}>Remove</button>
          </li>
        ))}
      </ul>
      <p>Total tasks: {tasks.length}</p>
      <p>Completed tasks: {tasks.filter((task: Task) => task.completed).length}</p>
    </div>
  );
}

export default App
