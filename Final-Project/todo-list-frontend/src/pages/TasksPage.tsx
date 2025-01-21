import { useState } from 'react';
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
import { fetchTasks, createTask, updateTask, deleteTask, getUser } from '../utils/apiUtils';
import { Task } from '../types'
import { useMutation, useQuery } from '@tanstack/react-query'
import { queryClient } from '../App';


function TaskItem({ task, onToggle, onDelete }: {
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


function TaskList({ tasks, onToggle, onDelete }: {
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
  const [newTask, setNewTask] = useState('');
  
  // This is for Get requests
  const { data: tasks, isLoading: IsLoadingTasks } = useQuery({ queryKey: ['tasks'], queryFn: fetchTasks });
  const { data: user, isLoading: isLoadingUser } = useQuery({ queryKey: ['myUser'], queryFn: getUser });

  // This is for POST/DELETE/PUT
  const { mutateAsync: postTask } = useMutation({ mutationFn: createTask, onSuccess: () => queryClient.invalidateQueries({ queryKey: ['tasks'] })});
  const { mutateAsync: removeTask } = useMutation({ mutationFn: deleteTask, onSuccess: () => queryClient.invalidateQueries({ queryKey: ['tasks'] })});
  const { mutateAsync: editTask } = useMutation({ mutationFn: updateTask, onSuccess: () => queryClient.invalidateQueries({ queryKey: ['tasks'] })});

  if (IsLoadingTasks || isLoadingUser){
    return <h1>IsLoading...</h1>
  }

  const handleAddTask = async () => {
    if (newTask.trim() === '') return alert('Task cannot be empty.');

    try {
      await postTask( { title: newTask, completed: false });
      setNewTask('');
    } 
    catch (error) {
      console.error(error);
    }
  };


  const handleToggleTask = async (task: Task) => {
    try {
      const updatedTask = await updateTask({ ...task, completed: !task.completed });
    } 
    catch (error) {
      console.error(error);
    }
  };


  const handleDeleteTask = async (task: Task) => {
    try {
      await removeTask(task.id); // Use task.id
    } 
    catch (error) {
      console.error(error);
    }
  };

  return (
    <Box sx={{ p: 4 }}>
      <Grid2 container spacing={4} justifyContent="center">
        <Grid2 size={{ xs: 12 }} display="flex" justifyContent="center">
          <Typography variant="h4" component="h1">
            Hello, {user.username}! Let's manage your tasks.
          </Typography>
        </Grid2>

        <Grid2 size={{ xs: 12 }} display="flex" justifyContent="center">
          <Typography>
            <strong>Total tasks: {tasks.length}</strong>
          </Typography>
          <Typography sx={{ ml: 2 }}>
            <strong>
              Completed tasks: {tasks.filter((task: Task) => task.completed).length} 
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
            onToggle={handleToggleTask}
            onDelete={handleDeleteTask}
          />
        </Grid2>
      </Grid2>
    </Box>
  );
}

export default TaskListApp;


