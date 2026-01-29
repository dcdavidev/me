import { Outlet } from 'react-router';

import { Box, Flex } from '@radix-ui/themes';

export default function AuthLayout() {
  return (
    <Box position="relative" minHeight="100vh" width="100%">
      <Flex
        justify="center"
        align="center"
        minHeight="100vh"
        width="100%"
        style={{ overflow: 'hidden' }}
      >
        <Box width="100%">
          <Outlet />
        </Box>
      </Flex>
    </Box>
  );
}
