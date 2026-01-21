import {
  isRouteErrorResponse,
  Link,
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
} from 'react-router';

import {
  Avatar,
  Box,
  Code,
  Container,
  Flex,
  Grid,
  Heading,
  Text,
  Theme,
} from '@radix-ui/themes';
import { Background } from '@pittorica/pitto';

import {
  Divider,
  LoadingScreen,
  SplashScreen,
} from '@repo/shared-ui-components';

import meSqrd from './me.webp';

import './app.css';
import '@radix-ui/themes/styles.css';

import type { Route } from './+types/root';

export const meta: Route.MetaFunction = () => [
  {
    title: 'Davide DC',
  },
  {
    name: 'apple-mobile-web-app-title',
    content: 'Davide DC',
  },
];

export const links: Route.LinksFunction = () => [
  { rel: 'preconnect', href: 'https://fonts.googleapis.com' },
  {
    rel: 'preconnect',
    href: 'https://fonts.gstatic.com',
    crossOrigin: 'anonymous',
  },
  {
    rel: 'stylesheet',
    href: 'https://fonts.googleapis.com/css2?family=Funnel+Display:wght@300..800&family=Momo+Trust+Sans:wght@200..800&family=Roboto+Serif:ital,opsz,wght@0,8..144,100..900;1,8..144,100..900&display=swap',
  },
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
    <html lang="en">
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
          <main style={{ position: 'relative' }}>{children}</main>

          <Box
            id="footer"
            pt="9"
            style={{ minHeight: '100vh', position: 'relative' }}
          >
            <Background variant="beams" colors={['#ffffff']} />

            <Container size="4">
              <Flex
                mt="9"
                justify={'center'}
                align={'center'}
                direction={'column'}
              >
                <Grid columns={{ initial: '1', md: '2', lg: '3' }} gap="6">
                  <Avatar src={meSqrd} fallback="DC" size={'9'} radius="full" />
                  <Box />
                  <Box />

                  <Flex
                    direction={'column'}
                    justify={'center'}
                    align={'start'}
                    gap={'2'}
                  >
                    <Heading size={'4'}>Davide Di Criscito</Heading>
                    <Text>Full Stack Developer powering web solutions.</Text>
                  </Flex>

                  <Flex
                    direction={'column'}
                    justify={'start'}
                    align={'start'}
                    gap={'2'}
                  >
                    <Link to={'/#home'}>Home</Link>
                    <Link to={'/#about'}>About</Link>
                    <Link to={'/#tech-stack'}>Tech Stack</Link>
                  </Flex>
                </Grid>
              </Flex>

              <Divider variant="scallop" />

              <Flex justify={'center'} align={'center'}>
                <Text align={'center'}>
                  Davide Di Criscito - Italian VAT number 04737220980
                </Text>
              </Flex>
            </Container>
          </Box>
        </Theme>
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  );
}

export function HydrateFallback() {
  return <LoadingScreen />;
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
    <SplashScreen>
      <Flex justify={'center'} align={'center'} gap="4">
        <Heading size="5">{message}</Heading>
        <Text>{details}</Text>
        {stack && <Code>{stack}</Code>}
      </Flex>
    </SplashScreen>
  );
}

export default function App() {
  return <Outlet />;
}
