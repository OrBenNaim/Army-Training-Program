import axios from 'axios';
import { Task } from '../types';

const BASE_URL = 'http://localhost:3000';   // Backend URL

const axiosInstance = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export async function loginUser(userCredentials: { username: string, password: string }) {
  const response = await axiosInstance.post('/auth/signin', userCredentials);
  console.log(response.data)
  return response.data;   // { accessToken }
}


export async function registerUser(userCredentials: {username: string, password: string}) {
  const response = await axiosInstance.post('/auth/signup', userCredentials);
  return response.data;
}


export async function getUser() {
  const accessToken = localStorage.getItem('accessToken'); 
  const response = await axiosInstance.get('/users/myUser', 
    {
      headers: { Authorization: `Bearer ${accessToken}` },
    }
  );
  return response.data; // Array of tasks
}


// Task APIs
export async function fetchTasks(): Promise<Task[]> {
  const accessToken = localStorage.getItem('accessToken'); 
  const response = await axiosInstance.get('/todos',
    {
      headers: { Authorization: `Bearer ${accessToken}` },
    }
  );
  return response.data as Task[]; // Array of tasks
}


export async function createTask(task: { title: string; completed: boolean }): Promise<Task> {
  const accessToken = localStorage.getItem('accessToken'); 
  const response = await axiosInstance.post('/todos', task,
    {
      headers: { Authorization: `Bearer ${accessToken}` },
    }
  );
  return response.data as Task;   // Newly created task
}


export async function updateTask(updatedTask: Task): Promise<Task> {
  updatedTask.completed = !updatedTask.completed;   // Toggle boolean value
  
  const accessToken = localStorage.getItem('accessToken'); 
  const response = await axiosInstance.put('/todos/', updatedTask, 
    {
      headers: { Authorization: `Bearer ${accessToken}` },
    }
  );
  return response.data as Task; // Updated task
}


export async function deleteTask(taskId: number): Promise<void> {
  const accessToken = localStorage.getItem('accessToken');
  await axiosInstance.delete(`/todos/${taskId}`, 
    {
      headers: { Authorization: `Bearer ${accessToken}` },
    }
  );
}


