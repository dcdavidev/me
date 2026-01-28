import { useNavigate } from 'react-router';

import { Avatar, Box, Flex, IconButton } from '@radix-ui/themes';

import {
  IconBrandGithubFilled,
  IconBrandLinkedinFilled,
} from '@tabler/icons-react';

import meSquared from '~/assets/me/squared.webp';

export function AppBar() {
  const navigate = useNavigate();

  return (
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
            src={meSquared}
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
            onClick={() => window.open('https://linkedin.com/in/dcdavidev')}
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
  );
}
