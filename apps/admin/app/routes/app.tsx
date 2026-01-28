import { Outlet, redirect } from 'react-router';

import { isAxiosError } from 'axios';

import { api } from '@repo/admin-configs';

export async function clientLoader() {
  try {
    await api.get('/me');
    return null;
  } catch (error) {
    if (isAxiosError(error) && error.response?.status === 401) {
      throw redirect('/');
    }
    throw redirect('/');
  }
}

export default function AppLayout() {
  return (
    <>
      <Outlet />
    </>
  );
}
