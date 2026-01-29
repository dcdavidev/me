import axios from 'axios';

const baseURL = import.meta.env.DEV
  ? `http://localhost:${import.meta.env.PORT}/api`
  : '/api';

export const api = axios.create({
  baseURL: baseURL,
  timeout: 10_000,
  withCredentials: true,
});
