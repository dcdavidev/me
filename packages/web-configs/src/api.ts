import axios from 'axios';

const devURL = `http://localhost:${import.meta.env.PORT || 3000}/api`;
const prodURL = import.meta.env.HOST
  ? `https://${import.meta.env.HOST}/api`
  : 'https://dcdavidev.me/api';

const baseURL = import.meta.env.DEV ? devURL : prodURL;

console.log(`[Axios Init] Mode: ${import.meta.env.MODE} | BaseURL: ${baseURL}`);

export const api = axios.create({
  baseURL: baseURL,
  timeout: 10_000,
});

/**
 * Global response interceptor.
 * Automatically handles 401 errors by redirecting to login.
 */
api.interceptors.response.use(
  (response) => response,
  (error) => {
    // Check if the error is a 401 Unauthorized
    if (
      error.response?.status === 401 && // Avoid redirect loops if we are already on the login page
      globalThis.window !== undefined &&
      !globalThis.location.pathname.startsWith('/login')
    ) {
      const currentPath =
        globalThis.location.pathname + globalThis.location.search;
      const loginUrl = `/login?next=${encodeURIComponent(currentPath)}`;

      // Use hard redirect to clear memory state/cache
      globalThis.location.href = loginUrl;
    }
    return Promise.reject(error);
  }
);
