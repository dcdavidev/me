import 'pittorica';
import '@fontsource-variable/inter';
import '@fontsource/momo-trust-display';

import { I18nextProvider } from 'react-i18next';

import {
  isRouteErrorResponse,
  Links,
  type LoaderFunctionArgs,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  useLoaderData,
} from 'react-router';

import { PittoricaTheme } from '@pittorica/react';

import { consentConfig } from '@repo/shared-client-configs';
import { CookieConsentInit } from '@repo/shared-ui-components';

import './app.css';

import type { Route } from './+types/root';

import i18n from '~/translations';

function getLocale(request: Request): string {
  const url = new URL(request.url);
  if (url.searchParams.has('lang')) {
    return url.searchParams.get('lang') === 'it' ? 'it' : 'en';
  }

  const acceptLanguage = request.headers.get('Accept-Language');
  if (acceptLanguage?.includes('it')) {
    return 'it';
  }

  // Default
  return 'en';
}

export const meta: Route.MetaFunction = () => {
  return [
    { title: 'Davide Di Criscito' },
    {
      name: 'description',
      content: 'Full Stack developer: powering web solutions.',
    },
    {
      name: 'author',
      content: 'Davide Di Criscito',
    },
    {
      name: 'apple-mobile-web-app-title',
      content: 'Davide DC',
    },
    {
      name: 'application-name',
      content: 'Davide DC',
    },
    {
      name: 'msapplication-TileColor',
      content: '#75485e',
    },
    {
      name: 'theme-color',
      content: '#75485e',
    },
  ];
};

export const links: Route.LinksFunction = () => {
  return [
    {
      rel: 'stylesheet',
      href: 'https://cdn.jsdelivr.net/gh/dheereshag/coloured-icons@1.9.6/app/ci.min.css',
    },
    {
      rel: 'icon',
      type: 'image/png',
      href: '/favicon-96x96.png',
      sizes: '96x96',
    },
    { rel: 'icon', type: 'image/svg+xml', href: '/favicon.svg' },
    { rel: 'shortcut icon', href: '/favicon.ico' },
    {
      rel: 'apple-touch-icon',
      sizes: '180x180',
      href: '/apple-touch-icon.png',
    },
    { rel: 'manifest', href: '/site.webmanifest' },
  ];
};

export async function loader({ request }: LoaderFunctionArgs) {
  const locale = getLocale(request);
  return { locale };
}

export function Layout({ children }: { children: React.ReactNode }) {
  // Lang/Locales
  const { locale } = useLoaderData<typeof loader>();
  if (i18n.language !== locale) {
    i18n.changeLanguage(locale);
  }

  return (
    <I18nextProvider i18n={i18n}>
      <html lang={locale}>
        <head>
          <meta charSet="utf-8" />
          <meta name="viewport" content="width=device-width, initial-scale=1" />
          <Meta />
          <Links />
        </head>
        <body className="pittorica-theme" data-appearance="dark">
          <PittoricaTheme sourceColor="#75485e" appearance="dark">
            {children}
            <ScrollRestoration />
          </PittoricaTheme>

          <CookieConsentInit config={consentConfig} />
          <Scripts />
        </body>
      </html>
    </I18nextProvider>
  );
}

export default function App() {
  return <Outlet />;
}

export function ErrorBoundary({ error }: Route.ErrorBoundaryProps) {
  let message = 'Oops!';
  let details = 'An unexpected error occurred.';
  let stack: string | undefined;

  if (isRouteErrorResponse(error)) {
    message = error.status === 404 ? '404' : 'Error';
    details =
      error.status === 404
        ? 'The requested page could not be found.'
        : error.statusText || details;
  } else if (import.meta.env.DEV && error && error instanceof Error) {
    details = error.message;
    stack = error.stack;
  }

  return (
    <main className="pt-16 p-4 container mx-auto">
      <h1>{message}</h1>
      <p>{details}</p>
      {stack && (
        <pre className="w-full p-4 overflow-x-auto">
          <code>{stack}</code>
        </pre>
      )}
    </main>
  );
}
