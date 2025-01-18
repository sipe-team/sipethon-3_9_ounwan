import axios from 'axios';

export const axiosClient = axios.create({
  baseURL: 'https://c135-183-96-52-165.ngrok-free.app',
  timeout: 15000,
  headers: {
    'Content-Type': 'application/json',
  },
});
