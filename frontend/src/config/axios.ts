import axios from 'axios';
const BASE_URL = import.meta.env.VITE_API_URL;

const axiosInstance = axios.create({
  baseURL: BASE_URL,
  timeout: 30000,
});

export { axiosInstance, BASE_URL };
