import { redirect } from 'react-router';

import { api } from '@repo/admin-configs';

export async function clientAction() {
  try {
    await api.post('/logout');
  } catch (error) {
    console.error('[Logout] Error during API call:', error);
  }

  // Hard reload verso il login per pulire axios, cache e state
  globalThis.location.href = '/login';
  return null;
}

export async function clientLoader() {
  return redirect('/');
}
