import { useState, useEffect } from 'react';
import {
  Box,
  Button,
  Checkbox,
  IconButton,
  List,
  ListItem,
  ListItemText,
  TextField,
  Typography,
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import Grid2 from '@mui/material/Grid2';
import { loadFromLocalStorage, saveToLocalStorage } from '../utils/localStorageUtils';

interface Task {
  id: number;
  title: string;
  completed: boolean;
}

interface DecodedToken {
  username: string;
}

function TaskItem({
  task,
  onToggle,
  onDelete,
}: {
  task: Task;
  onToggle: (task: Task) => void;
  onDelete: (task: Task) => void;
}) {
  return (
    <ListItem
      sx={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
      }}
    >
      <Checkbox
        checked={task.completed}
        onChange={() => onToggle(task)}
        aria-checked={task.completed}
        sx={{ marginRight: 1 }}
      />
      <ListItemText
        primary={task.title}
        primaryTypographyProps={{
          style: { textDecoration: task.completed ? 'line-through' : 'none' },
        }}
        sx={{ flex: 1 }}
      />
      <IconButton edge="end" aria-label="delete" onClick={() => onDelete(task)}>
        <DeleteIcon />
      </IconButton>
    </ListItem>
  );
}


function TaskList({
  tasks,
  onToggle,
  onDelete,
}: {
  tasks: Task[];
  onToggle: (task: Task) => void;
  onDelete: (task: Task) => void;
}) {
  return (
    <List>
      {tasks.length === 0 ? (
        <Typography
          variant="h6"
          sx={{
            color: 'black',
            fontStyle: 'italic',
            textAlign: 'center',
            backgroundColor: '#a4625e',
            width: '100%',
            padding: 2,
            borderRadius: 2,
            border: '1px solid lightgray',
          }}
        >
          No tasks yet. Add some!
        </Typography>
      ) : (
        tasks.map((task) => (
          <TaskItem
            key={task.id}
            task={task}
            onToggle={onToggle}
            onDelete={onDelete}
          />
        ))
      )}
    </List>
  );
}



function TaskListApp(): JSX.Element {
  
  const [tasks, setTasks] = useState<Task[]>(
    () => loadFromLocalStorage<Task[]>('tasks') || []
  );
  
  const [newTask, setNewTask] = useState('');
  const [username, setUsername] = useState<string>('');

  // Retrieve username from the access token
  useEffect(() => {
  const accessToken = loadFromLocalStorage<string>('accessToken');
  if (accessToken) {
    try {
      const decoded: DecodedToken = jwtDecode(accessToken);
      setUsername(decoded.username);
    } 
    catch (error) {
      console.error('Failed to decode access token:', error);
    }
  }
}, []);

  useEffect(() => {
    saveToLocalStorage('tasks', tasks);
  }, [tasks]);

  const handleAddTask = () => {
    if (newTask.trim() === '') {
      alert('Task title cannot be empty.');
      return;
    }

    if (tasks.some((task) => task.title === newTask.trim())) {
      alert('A task with this title already exists.');
      return;
    }

    const task: Task = {
      id: Date.now(),
      title: newTask.trim(),
      completed: false,
    };

    setTasks([...tasks, task]);
    setNewTask('');
  };

  const handleRemoveTask = (taskToRemove: Task) => {
    setTasks(tasks.filter((task) => task.id !== taskToRemove.id));
  };

  const handleToggleCompleted = (taskToToggle: Task) => {
    setTasks(
      tasks.map((task) =>
        task.id === taskToToggle.id
          ? { ...task, completed: !task.completed }
          : task
      )
    );
  };

  return (
    <Box sx={{ p: 4 }}>

      <Grid2 container spacing={4} justifyContent="center">
        <Grid2 size={{ xs: 12 }} display="flex" justifyContent="center">

          <Typography variant="h4" component="h1">
            Hello, {username}! Let's manage your tasks.
          </Typography>

        </Grid2>

        <Grid2 size={{ xs: 12 }} display="flex" justifyContent="center">

          <Typography>
            <strong>Total tasks: {tasks.length}</strong>
          </Typography>

          <Typography sx={{ ml: 2 }}>
            <strong>
              Completed tasks: {tasks.filter((task) => task.completed).length}
            </strong>
          </Typography>

        </Grid2>

        <Grid2 size={{ xs: 12, sm: 8, md: 6 }} display="flex" gap={2}>
          <TextField
            label="New Task"
            variant="outlined"
            fullWidth
            value={newTask}
            onChange={(e) => setNewTask(e.target.value)}
            placeholder="Enter a new task"
          />
          <Button
            variant="contained"
            color="success"
            onClick={handleAddTask}
            sx={{
              fontSize: '1.25rem',
              fontWeight: 'bold',
            }}
          >
            Add Task
          </Button>
        </Grid2>
        <Grid2 size={{ xs: 12 }} display="flex" justifyContent="center">
          <TaskList
            tasks={tasks}
            onToggle={handleToggleCompleted}
            onDelete={handleRemoveTask}
          />
        </Grid2>
      </Grid2>
    </Box>
  );
}

export default TaskListApp;

function jwtDecode(accessToken: string): DecodedToken {
  throw new Error('Function not implemented.');
}

