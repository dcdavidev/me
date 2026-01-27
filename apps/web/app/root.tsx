import '@fontsource/momo-trust-sans';
import '@fontsource-variable/funnel-display';
import '@fontsource-variable/roboto-serif';
import '@fontsource-variable/source-code-pro';

import {
  isRouteErrorResponse,
  Link,
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  useNavigate,
} from 'react-router';

import {
  Avatar,
  Box,
  Button,
  Card,
  Code,
  Container,
  Flex,
  Grid,
  Heading,
  IconButton,
  Separator,
  Text,
  Theme,
} from '@radix-ui/themes';

import {
  IconArrowUpDashed,
  IconBrandGithubFilled,
  IconBrandLinkedinFilled,
} from '@tabler/icons-react';

import { SplashScreen } from '@repo/shared-ui-components';
import { CookieConsentInit } from '@repo/web-components';
import { consentConfig } from '@repo/web-configs';

import footerBgImg from '~/assets/backgrounds/abstract-purple.webp';
import meSqrd from '~/assets/me/squared.webp';

import '@radix-ui/themes/styles.css';
import '~/app.css';

import type { Route } from './+types/root';
import { useCookieConsent } from './hooks';

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
  const navigate = useNavigate();
  const { showPreferences } = useCookieConsent();

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
          <Box
            position="fixed"
            left="0"
            right="0"
            top="0"
            p="2"
            style={{ zIndex: 1000 }}
          >
            <Flex direction="row" gap="2" justify="center" align="start">
              <Box flexGrow="1">
                <Avatar
                  size="3"
                  src={meSqrd}
                  fallback="Me"
                  radius="full"
                  onClick={() => navigate('/')}
                  style={{ cursor: 'pointer' }}
                />
              </Box>
              <Flex gap="4" justify="center" align="end" p="2">
                <IconButton
                  variant="ghost"
                  color="blue"
                  onClick={() =>
                    window.open('https://linkedin.com/in/dcdavidev')
                  }
                >
                  <IconBrandLinkedinFilled />
                </IconButton>
                <IconButton
                  variant="ghost"
                  color="gray"
                  onClick={() => window.open('https://github.com/dcdavidev')}
                >
                  <IconBrandGithubFilled />
                </IconButton>
              </Flex>
            </Flex>
          </Box>

          <Box>
            <main style={{ position: 'relative' }}>
              {children}
              <ScrollRestoration />
            </main>
          </Box>

          <Flex
            id="footer"
            justify={'center'}
            align={'center'}
            style={{
              minHeight: '100vh',
              position: 'relative',
              backgroundImage: `url(${footerBgImg})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
            }}
          >
            <Box px={'4'} width={'100%'}>
              <Container size={{ initial: '1', md: '4' }}>
                <Flex justify={'center'} align={'center'} py={'9'}>
                  <Button color={'blue'} onClick={() => navigate('#top')}>
                    back to top <IconArrowUpDashed />
                  </Button>
                </Flex>
                <Card mb={'6'}>
                  <Box p={'4'}>
                    <Flex
                      direction={'column'}
                      justify={'center'}
                      align={{ initial: 'center', md: 'start' }}
                      gap={'2'}
                    >
                      <Heading
                        size={{ initial: '4', md: '6' }}
                        wrap={'pretty'}
                        align={{ initial: 'center', md: 'left' }}
                      >
                        Davide Di Criscito
                      </Heading>
                      <Text
                        wrap={'pretty'}
                        align={{ initial: 'center', md: 'left' }}
                      >
                        Full Stack Developer powering web solutions.
                      </Text>
                    </Flex>

                    <Separator my={'6'} style={{ width: '100%' }} />

                    <Grid columns={{ initial: '1', md: '2', lg: '3' }} gap="6">
                      <Flex
                        direction={'column'}
                        justify={'start'}
                        align={{ initial: 'center', md: 'start' }}
                        gap={'2'}
                      >
                        <Link to={'/'}>Home</Link>
                        <Link to={'/about'}>About</Link>
                        <Link to={'/contact-me'}>Contact Me</Link>
                        <Link to={'/tech-stack'}>Tech Stack</Link>
                      </Flex>

                      <Flex
                        direction={'column'}
                        justify={'start'}
                        align={{ initial: 'center', md: 'start' }}
                        gap={'2'}
                      >
                        <Link
                          to={'#'}
                          onClick={(e) => {
                            e.preventDefault();
                            showPreferences();
                          }}
                        >
                          Cookie Preferences
                        </Link>
                      </Flex>
                    </Grid>
                  </Box>
                </Card>

                <Container size={{ initial: '1', md: '4' }}>
                  <Flex
                    justify={'center'}
                    align={'center'}
                    direction={'column'}
                    gap={'4'}
                  >
                    <Text align={'center'} wrap="pretty">
                      Davide Di Criscito - Italian VAT number 04737220980
                    </Text>
                    <Text size={'1'} wrap="pretty" align={'center'}>
                      View the source code of this website on{' '}
                      <Link
                        to="https://github.com/dcdavidev/me"
                        target="_blank"
                      >
                        GitHub
                      </Link>
                      .
                    </Text>
                  </Flex>
                </Container>
              </Container>
            </Box>
          </Flex>
        </Theme>

        <CookieConsentInit config={consentConfig} />
        <Scripts />
      </body>
    </html>
  );
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
      <Container size={{ initial: '1', sm: '2', md: '4' }} mx={'4'}>
        <Flex justify={'center'} align={'center'} gap="4" direction={'column'}>
          <Heading size="5">{message}</Heading>
          <Text>{details}</Text>
          {stack && <Code>{stack}</Code>}
        </Flex>
      </Container>
    </SplashScreen>
  );
}

export default function App() {
  return <Outlet />;
}
