import axios from 'axios';

const baseURL = import.meta.env.DEV
  ? `http://localhost:${import.meta.env.PORT}/api`
  : `https://${import.meta.env.HOST}/api`;

export const api = axios.create({
  baseURL: baseURL,
  timeout: 10_000,
  withCredentials: true,
});
