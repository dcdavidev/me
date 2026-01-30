import { redirect } from 'react-router';

import { serialize } from 'cookie';

import { api } from '@repo/web-configs';

/**
 * Server-side action to handle logout.
 * Clears the auth_token cookie and calls the backend logout endpoint.
 */
export async function action() {
  const headers = new Headers();
  headers.append('Location', '/login');

  try {
    const response = await api.post('/logout');

    const setCookie = response.headers['set-cookie'];
    if (setCookie) {
      for (const c of setCookie) {
        headers.append('Set-Cookie', c);
      }
    }
  } catch (error) {
    console.error('[Logout Server Action Error]:', error);
  }

  const clearCookie = serialize('auth_token', '', {
    path: '/',
    maxAge: 0,
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
  });

  headers.append('Set-Cookie', clearCookie);

  return new Response(null, {
    status: 302,
    headers,
  });
}

/**
 * Loader to prevent direct GET access to /logout.
 */
export async function loader() {
  return redirect('/dashboard');
}

export default function LogoutPage() {
  return null;
}
