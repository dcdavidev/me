import { redirect } from 'react-router';

import { api } from '@repo/web-configs';

export async function action() {
  const headers = new Headers();
  headers.append('Location', '/login');

  try {
    const response = await api.post('/logout');
    const setCookie = response.headers['set-cookie'];

    if (setCookie) {
      for (const c of setCookie) headers.append('Set-Cookie', c);
    }
  } catch (error) {
    console.error('[Logout Error]:', error);
  }

  headers.append(
    'Set-Cookie',
    'sessionId=; Path=/; Expires=Thu, 01 Jan 1970 00:00:00 GMT; HttpOnly'
  );

  return new Response(null, {
    status: 302,
    headers,
  });
}

export async function loader() {
  return redirect('/dashboard');
}

export default function LogoutPage() {
  return null;
}
