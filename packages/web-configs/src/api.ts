import axios from 'axios';

const isServer = globalThis.window === undefined;

export const api = axios.create({
  baseURL: isServer ? 'http://localhost:3000/api' : '/api',
  timeout: 10_000,
});
