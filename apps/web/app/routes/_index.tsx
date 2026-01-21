import { useActionData } from 'react-router';

import { Flex } from '@radix-ui/themes';
import { Toast } from 'radix-ui';

import { api } from '@repo/web-configs';

import type { Route } from './+types/_index';

import { About, TechStack, Welcome } from '~/routes/_home/index';

export function meta() {
  return [
    { title: 'Davide Di Criscito' },
    {
      name: 'description',
      content: 'Full Stack Developer powering web solutions.',
    },
  ];
}

export async function action({ request }: Route.ActionArgs) {
  const formData = await request.formData();
  const payload = Object.fromEntries(formData);

  try {
    const { data } = await api.post('/contact-me', payload);
    return { ...data, ok: true, timestamp: Date.now() };
  } catch (error: unknown) {
    const message =
      (error as { response?: { data?: { message?: string } } })?.response?.data
        ?.message || 'Failed to connect to server';
    return {
      message,
      ok: false,
      timestamp: Date.now(),
    };
  }
}

export default function Home() {
  const actionData = useActionData<typeof action>();

  return (
    <Toast.Provider swipeDirection="right">
      <Flex direction={'column'} gap={'9'}>
        <Welcome />
        <About />
        <TechStack />
      </Flex>

      <Toast.Root
        key={actionData?.timestamp}
        defaultOpen={!!actionData}
        className="ToastRoot"
        data-type={actionData?.ok ? 'success' : 'error'}
      >
        <Toast.Title className="ToastTitle">
          {actionData?.ok ? 'Success' : 'Error'}
        </Toast.Title>
        <Toast.Description className="ToastDescription">
          {actionData?.message}
        </Toast.Description>
      </Toast.Root>

      <Toast.Viewport className="ToastViewport" />
    </Toast.Provider>
  );
}
