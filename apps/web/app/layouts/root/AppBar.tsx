import { useNavigate } from 'react-router';

import { Avatar, Box, Card, Flex, IconButton } from '@radix-ui/themes';

import { IconMailForward } from '@tabler/icons-react';

import meSquared from '~/assets/me/squared.webp';

export function AppBar() {
  const navigate = useNavigate();

  return (
    <Box
      position="fixed"
      left="0"
      right="0"
      top="0"
      p="1"
      style={{ zIndex: 1000 }}
    >
      <Card size={'1'} style={{ padding: '4px' }}>
        <Flex direction="row" justify="center" align="center">
          <Box flexGrow="1">
            <Flex direction="row" justify="start" align="center" gap={'4'}>
              <Avatar
                src={meSquared}
                size="3"
                fallback="Me"
                radius="full"
                ml="2"
                onClick={() => navigate('/')}
                style={{ cursor: 'pointer' }}
              />

              <IconButton
                variant="ghost"
                color="blue"
                onClick={() => navigate('/contact-me')}
                style={{ cursor: 'pointer' }}
              >
                <IconMailForward />
              </IconButton>
            </Flex>
          </Box>
          <Flex gap="4" justify="center" align="center" mr="2">
            <IconButton
              variant="ghost"
              color="blue"
              onClick={() => window.open('https://linkedin.com/in/dcdavidev')}
              style={{ cursor: 'pointer' }}
            >
              <i className="ci ci-linkedin ci-2x"></i>
            </IconButton>
            <IconButton
              variant="ghost"
              color="gray"
              onClick={() => window.open('https://github.com/dcdavidev')}
              style={{ cursor: 'pointer' }}
            >
              <i className="ci ci-github ci-2x"></i>
            </IconButton>
          </Flex>
        </Flex>
      </Card>
    </Box>
  );
}
