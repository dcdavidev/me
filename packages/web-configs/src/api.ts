import axios from 'axios';

const isServer = globalThis.window === undefined;

export const api = axios.create({
  // @ts-expect-error end exists in ImportMeta
  baseURL: isServer ? `http://localhost:${import.meta.env.PORT}` : '/api',
  timeout: 10_000,
});
