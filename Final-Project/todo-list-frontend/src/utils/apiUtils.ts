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

export async function registerUser(user:{username: string, password: string}) {
    const response = await axiosInstance.post('/auth/signup', {username:user.username, password: user.password});
    return response.data;

}
export async function getUser() {
    const accessToken = localStorage.getItem('accessToken'); 
    const response = await axiosInstance.get('/users/myUser', {
      
      headers: { Authorization: `Bearer ${accessToken}` },
    });
    return response.data; // Array of tasks
}

// Task APIs
export async function fetchTasks() {
  const accessToken = localStorage.getItem('accessToken'); 

    const response = await axiosInstance.get('/todos', {
      
      headers: { Authorization: `Bearer ${accessToken}` },
    });
    return response.data; // Array of tasks
 
  
}

export async function createTask(task: { title: string; completed: boolean }): Promise<Task> {

    const accessToken = localStorage.getItem('accessToken'); 

    const response = await axiosInstance.post('/todos', task, {
      headers: { Authorization: `Bearer ${accessToken}` },
    });

    return response.data as Task;   // Newly created task
  

}

export async function updateTask(
  accessToken: string,
  taskId: number,
  updatedTask: { title: string; completed: boolean }
) {
  try {
    const response = await axiosInstance.put(`/todos/${taskId}`, updatedTask, {
      headers: { Authorization: `Bearer ${accessToken}` },
    });
    return response.data; // Updated task
  } catch (error) {
    handleAxiosError(error);
    throw new Error('Failed to update task');
  }
}

export async function deleteTask(accessToken: string, taskId: number): Promise<void> {
  try {
    await axiosInstance.delete(`/todos/${taskId}`, {
      headers: { Authorization: `Bearer ${accessToken}` },
    });
  } catch (error) {
    handleAxiosError(error);
    throw new Error('Failed to delete task');
  }
}


// Utility function to handle Axios errors
function handleAxiosError(error: any) {
  if (axios.isAxiosError(error)) {
    console.error('Axios Error:', error.response?.data || error.message);
    alert(error.response?.data?.message || 'An error occurred');
  } 
  else {
    console.error('Unknown Error:', error);
  }
}


