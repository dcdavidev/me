import { Box, Container, Flex, Heading } from '@radix-ui/themes';

import { BoxEaseIn } from '@repo/shared-ui-components';

import backgroundImage from '~/assets/backgrounds/abstract-blue.webp';
import meFull from '~/assets/me/full.webp';

export function Top() {
  return (
    <Flex
      id="top"
      position="relative"
      overflow="hidden"
      align="center"
      justify="center"
      style={{
        backgroundImage: `url(${backgroundImage})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        minHeight: '100vh',
      }}
    >
      <Box mx={'4'}>
        <Container size={{ initial: '1', sm: '2', md: '4' }}>
          <Flex justify="center" align="center" gap={'4'} direction={'column'}>
            <BoxEaseIn>
              <Heading
                size={{ initial: '8', md: '9' }}
                mb="6"
                align="center"
                wrap="pretty"
              >
                Davide Di Criscito
              </Heading>
            </BoxEaseIn>

            <BoxEaseIn>
              <Heading
                size={{ initial: '6', md: '8' }}
                mb="9"
                align="center"
                wrap="pretty"
              >
                full stack developer—powering web solutions.
              </Heading>
            </BoxEaseIn>

            <BoxEaseIn>
              <img
                src={meFull}
                alt="A picture of me"
                style={{
                  width: '100%',
                  maxWidth: '300px',
                  height: 'auto',
                  borderRadius: 'var(--radius-4)',
                }}
              />
            </BoxEaseIn>
          </Flex>
        </Container>
      </Box>
    </Flex>
  );
}
