import axios from 'axios';

const BASE_URL = 'http://localhost:3000';   // Backend URL

const axiosInstance = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export async function loginUser(username: string, password: string) {
  try {
    const response = await axiosInstance.post('/auth/signin', { username, password });
    console.log(response)
    return response.data; // { accessToken }
  } 
  catch (error) {
    handleAxiosError(error);
    throw new Error('Failed to log in');
  }
}

export async function registerUser(username: string, password: string) {
  try {
    const response = await axiosInstance.post('/auth/signup', { username, password });
    console.log(response.data)
    return response.data;
  } 
  catch (error) {
    handleAxiosError(error);
    throw new Error('Failed to register');
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
