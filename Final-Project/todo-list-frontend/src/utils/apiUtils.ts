import axios from 'axios';
import { Task } from '../types';

const BASE_URL = 'http://localhost:3000';   // Backend URL

const axiosInstance = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export async function loginUser(username: string, password: string) {
  const response = await axiosInstance.post('/auth/signin', { username, password });
  console.log(response.data)
  return response.data;   // { accessToken }
}

export async function registerUser(user: {username: string, password: string}) {
  const response = await axiosInstance.post('/auth/signup', {username:user.username, password: user.password});
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
export async function fetchTasks() {
  const accessToken = localStorage.getItem('accessToken'); 
  const response = await axiosInstance.get('/todos',
    {
      headers: { Authorization: `Bearer ${accessToken}` },
    }
  );
  return response.data; // Array of tasks
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

export async function updateTask(updatedTask: { title: string; completed: boolean }}): Promise<Task> {
  const accessToken = localStorage.getItem('accessToken'); 
  const response = await axiosInstance.put(`/todos/${updatedTask.taskId}`, props.updatedTask, 
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


