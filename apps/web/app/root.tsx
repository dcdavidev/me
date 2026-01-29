import '@fontsource/momo-trust-sans';
import '@fontsource-variable/funnel-display';
import '@fontsource-variable/roboto-serif';
import '@fontsource-variable/source-code-pro';

import { I18nextProvider, useTranslation } from 'react-i18next';

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

import {
  Box,
  Code,
  Container,
  Flex,
  Heading,
  Text,
  Theme,
} from '@radix-ui/themes';

import { CookieConsentInit } from '@repo/web-components';
import { consentConfig } from '@repo/web-configs';

import '@radix-ui/themes/styles.css';
import '~/app.css';

import type { Route } from './+types/root';

import i18n from '~/i18n';

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

export const meta: Route.MetaFunction = () => [
  {
    title: 'Davide Di Criscito',
  },
  {
    name: 'description',
    content: 'full stack developer—powering web solutions.',
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

          <CookieConsentInit config={consentConfig} />
          <Scripts />
        </body>
      </html>
    </I18nextProvider>
  );
}

export function ErrorBoundary({ error }: Route.ErrorBoundaryProps) {
  const { t } = useTranslation();

  let message = t('error.oops');
  let details = t('error.unexpected');
  let stack: string | undefined;

  if (isRouteErrorResponse(error)) {
    message =
      error.status === 404 ? t('error.404.title') : t('error.generic_title');
    details =
      error.status === 404 ? t('error.404.desc') : error.statusText || details;
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

export default function App() {
  return <Outlet />;
}
