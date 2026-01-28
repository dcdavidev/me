/* eslint-disable @cspell/spellchecker */
import '@fontsource/momo-trust-sans';
import '@fontsource-variable/funnel-display';
import '@fontsource-variable/roboto-serif';
import '@fontsource-variable/source-code-pro';

import {
  isRouteErrorResponse,
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
} from 'react-router';

import { DotLottieReact as Player } from '@lottiefiles/dotlottie-react';
import {
  Box,
  Code,
  Container,
  Flex,
  Heading,
  Text,
  Theme,
} from '@radix-ui/themes';

// @ts-expect-error lottie not typed
import animationData from '~/assets/animations/loading.lottie';

import '@radix-ui/themes/styles.css';
import '~/app.css';

import type { Route } from './+types/root';

export const meta: Route.MetaFunction = () => [
  {
    title: 'Admin | Davide Di Criscito',
  },
  {
    name: 'description',
    content: 'Admin panel.',
  },
  {
    name: 'author',
    content: 'Davide Di Criscito',
  },
  {
    name: 'apple-mobile-web-app-title',
    content: 'Davide DC',
  },
];

export const links: Route.LinksFunction = () => [
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

export function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="it">
      <head>
        <meta charSet="utf-8" />
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, user-scalable=no"
        />
        <Meta />
        <Links />
      </head>
      <body>
        <Theme appearance="dark" accentColor="ruby" radius="medium">
          <Box>
            <main style={{ position: 'relative' }}>
              {children}
              <ScrollRestoration />
            </main>
          </Box>
        </Theme>
        <Scripts />
      </body>
    </html>
  );
}

export function ErrorBoundary({ error }: Route.ErrorBoundaryProps) {
  let message = 'Ops!';
  let details = 'Si è verificato un errore inatteso.';
  let stack: string | undefined;

  if (isRouteErrorResponse(error)) {
    message = error.status === 404 ? 'Pagina non trovata' : 'Errore';
    details =
      error.status === 404
        ? 'La pagina che stai cercando non sembra esistere.'
        : error.statusText || details;
  } else if (import.meta.env.DEV && error && error instanceof Error) {
    details = error.message;
    stack = error.stack;
  }

  return (
    <Container size={{ initial: '1', sm: '2', md: '4' }} mx={'4'}>
      <Flex
        justify={'center'}
        align={'center'}
        gap="4"
        direction={'column'}
        my={'9'}
      >
        <Heading size={{ initial: '5', md: '8' }}>{message}</Heading>
        <Text>{details}</Text>

        {stack && (
          <Box
            width="100%"
            p="3"
            style={{
              backgroundColor: 'var(--gray-a3)',
              borderRadius: 'var(--radius-3)',
              overflowX: 'auto',
            }}
          >
            <Code
              size="2"
              variant="ghost"
              style={{
                display: 'block',
                whiteSpace: 'pre-wrap',
                wordBreak: 'break-word',
                textAlign: 'left',
                fontFamily: 'monospace',
              }}
            >
              {stack}
            </Code>
          </Box>
        )}
      </Flex>
    </Container>
  );
}

export function HydrateFallback() {
  return (
    <Flex
      justify="center"
      align="center"
      style={{ height: '100vh', width: '100vw' }}
    >
      <Player
        src={animationData as string}
        autoplay
        loop
        style={{ maxWidth: '100%' }}
      />
    </Flex>
  );
}

export default function App() {
  return <Outlet />;
}
