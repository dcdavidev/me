import axios from 'axios';

const devURL = `http://localhost:${import.meta.env.PORT || 3000}/api`;
const prodURL = import.meta.env.HOST
  ? `https://${import.meta.env.HOST}/api`
  : 'https://dcdavidev.me/api';

const baseURL = import.meta.env.DEV ? devURL : prodURL;

console.log(`[Axios Init] Mode: ${import.meta.env.MODE} | BaseURL: ${baseURL}`);

console.log(`[Axios Init] Mode: ${import.meta.env.MODE}, BaseURL: ${baseURL}`);

export const api = axios.create({
  baseURL: baseURL,
  timeout: 10_000,
});
