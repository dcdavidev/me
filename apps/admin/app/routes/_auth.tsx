import { useState } from 'react';

import { Outlet, redirect, useFetcher } from 'react-router';

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
  IconDoorExit,
  IconLayoutSidebarLeftCollapse,
  IconLayoutSidebarLeftExpand,
} from '@tabler/icons-react';

import { AnimatePresence, motion } from 'motion/react';

import { api } from '@repo/admin-configs';

import type { Route } from './+types/_auth.js';

export function shouldRevalidate() {
  return true;
}

export async function clientLoader({ request }: Route.ClientLoaderArgs) {
  try {
    await api.get('/me');
    return null;
  } catch {
    const url = new URL(request.url);
    const searchParams = new URLSearchParams();

    if (url.pathname !== '/') {
      searchParams.set('next', url.pathname + url.search);
    }

    const loginUrl =
      searchParams.size > 0 ? `/login?${searchParams.toString()}` : '/login';

    throw redirect(loginUrl);
  }
}

export default function AppLayout() {
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

                  <Box px="3" py="2" overflowY="auto">
                    <Text size="2" color="gray">
                      Navigazione
                    </Text>
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
