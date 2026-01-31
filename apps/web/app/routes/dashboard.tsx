import { useState } from 'react';

import { NavLink, Outlet, redirect, useFetcher } from 'react-router';

import { isAxiosError } from 'axios';

import {
  Box,
  Card,
  Flex,
  Heading,
  IconButton,
  Separator,
  Text,
} from '@radix-ui/themes';

import {
  type Icon,
  IconBriefcase,
  IconDoorExit,
  IconLayoutSidebarLeftCollapse,
  IconLayoutSidebarLeftExpand,
  IconPlus,
  IconSmartHome,
} from '@tabler/icons-react';

import { parse } from 'cookie';
import { AnimatePresence, motion } from 'motion/react';

import { api } from '@repo/web-configs';

import type { Route } from './+types/dashboard';

export function meta() {
  return [{ title: 'Dashboard | Davide Di Criscito' }];
}

export async function loader({ request }: Route.LoaderArgs) {
  const cookieHeader = request.headers.get('Cookie');
  const cookies = parse(cookieHeader || '');
  const token = cookies.auth_token;

  console.log(
    /* cspell:disable-next-line */
    '[Dashboard Loader] Token ricevuto dal browser:',
    token ? 'SI' : 'NO'
  );

  if (!token) {
    /* cspell:disable-next-line */
    console.log('[Dashboard Loader] Redirecting to login: Token mancante');
    throw redirect('/login');
  }

  try {
    await api.post('/me', { token });

    return new Response(null, {
      status: 200,
      headers: {
        'Cache-Control': 'no-store, no-cache, must-revalidate',
      },
    });
  } catch (error: unknown) {
    if (isAxiosError(error)) {
      console.error(
        '[Dashboard Loader] API Validation Error:',
        error.response?.status || error.message
      );
    } else {
      console.error('[Dashboard Loader] Unexpected Error:', error);
    }

    const url = new URL(request.url);
    const next =
      url.pathname === '/dashboard'
        ? ''
        : `?next=${encodeURIComponent(url.pathname + url.search)}`;
    throw redirect(`/login${next}`);
  }
}

function SidebarLink({
  to,
  icon: IconComponent,
  children,
  onClick,
}: {
  to: string;
  icon: Icon;
  children: React.ReactNode;
  onClick?: () => void;
}) {
  return (
    <NavLink
      to={to}
      end
      onClick={onClick}
      style={({ isActive }) => ({
        textDecoration: 'none',
        display: 'flex',
        alignItems: 'center',
        gap: '12px',
        padding: '8px 12px',
        borderRadius: 'var(--radius-2)',
        backgroundColor: isActive ? 'var(--accent-a3)' : 'transparent',
        color: isActive ? 'var(--accent-11)' : 'var(--gray-11)',
        transition: 'all 0.2s ease',
      })}
    >
      <IconComponent size={18} />
      <Text size="2" weight="medium">
        {children}
      </Text>
    </NavLink>
  );
}

export default function DashboardLayout() {
  const fetcher = useFetcher();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const toggleSidebar = () => setIsSidebarOpen((prev) => !prev);

  return (
    <Box position="relative" overflow="hidden" style={{ minHeight: '100vh' }}>
      {/* Top Bar */}
      <Box p="1">
        <Card size="1">
          <Flex direction="row" gap="2" align="center">
            <Flex flexGrow="1">
              <IconButton variant="ghost" color="gray" onClick={toggleSidebar}>
                <IconLayoutSidebarLeftExpand />
              </IconButton>
            </Flex>
            <Flex gap="2">
              {/* Pointing to the logout route action */}
              <fetcher.Form method="post" action="/logout">
                <IconButton
                  variant="ghost"
                  color="ruby"
                  type="submit"
                  disabled={fetcher.state !== 'idle'}
                >
                  <IconDoorExit />
                </IconButton>
              </fetcher.Form>
            </Flex>
          </Flex>
        </Card>
      </Box>

      {/* Main Area */}
      <Box p="4">
        <Outlet />
      </Box>

      {/* Sidebar Overlay and Menu */}
      <AnimatePresence>
        {isSidebarOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={toggleSidebar}
              style={{
                position: 'fixed',
                inset: 0,
                backgroundColor: 'rgba(0, 0, 0, 0.5)',
                backdropFilter: 'blur(2px)',
                zIndex: 40,
              }}
            />

            <motion.div
              initial={{ x: '-100%' }}
              animate={{ x: 0 }}
              exit={{ x: '-100%' }}
              transition={{ type: 'spring', damping: 20, stiffness: 200 }}
              style={{
                position: 'fixed',
                top: '4px',
                left: '4px',
                bottom: '4px',
                width: 'calc(100vw - 56px)',
                maxWidth: '300px',
                zIndex: 50,
              }}
            >
              <Card size="1" style={{ width: '100%', height: '100%' }}>
                <Flex direction="column" height="100%">
                  <Flex justify="end" p="1" mb="2" align="center">
                    <Box flexGrow="1">
                      <Heading size="4" ml="2">
                        Menu Admin
                      </Heading>
                    </Box>
                    <IconButton
                      variant="ghost"
                      color="gray"
                      onClick={toggleSidebar}
                    >
                      <IconLayoutSidebarLeftCollapse />
                    </IconButton>
                  </Flex>

                  <Separator style={{ width: '100%' }} />

                  <Box px="2" py="3" overflowY="auto" flexGrow="1">
                    <Flex direction="column" gap="1">
                      <Text size="1" color="gray" mb="2" ml="2" weight="bold">
                        {/* cspell:disable-next-line */}
                        PRINCIPALE
                      </Text>
                      <SidebarLink
                        to="/dashboard"
                        icon={IconSmartHome}
                        onClick={toggleSidebar}
                      >
                        Home
                      </SidebarLink>

                      <Separator size="4" my="3" style={{ opacity: 0.5 }} />

                      <Text size="1" color="gray" mb="2" ml="2" weight="bold">
                        {/* cspell:disable-next-line */}
                        PROGETTI
                      </Text>
                      <SidebarLink
                        to="/dashboard/projects"
                        icon={IconBriefcase}
                        onClick={toggleSidebar}
                      >
                        {/* cspell:disable-next-line */}
                        Tutti i progetti
                      </SidebarLink>
                      <SidebarLink
                        to="/dashboard/projects/new"
                        icon={IconPlus}
                        onClick={toggleSidebar}
                      >
                        {/* cspell:disable-next-line */}
                        Nuovo Progetto
                      </SidebarLink>
                    </Flex>
                  </Box>
                </Flex>
              </Card>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </Box>
  );
}
