import { Container, Flex, Heading } from '@radix-ui/themes';

import { BoxEaseIn } from '@repo/shared-ui-components';

import backgroundImage from './abstract-colors-brown.webp';

import { HomeActions } from './HomeActions';

export function Welcome() {
  return (
    <Flex
      id="home"
      position="relative"
      height="100vh"
      overflow="hidden"
      align="center"
      justify="center"
      style={{
        backgroundImage: `url(${backgroundImage})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      <Container size={{ initial: '1', sm: '2', md: '4' }} px="2">
        <BoxEaseIn>
          <Heading
            size={{ initial: '8', md: '9' }}
            mb="6"
            align="center"
            wrap="pretty"
          >
            Ready to build something <u>unique</u>?
          </Heading>
        </BoxEaseIn>
        <BoxEaseIn>
          <Heading
            size={{ initial: '8', md: '9' }}
            mb="9"
            align="center"
            wrap="pretty"
          >
            Let's start today.
          </Heading>
        </BoxEaseIn>

        <BoxEaseIn>
          <HomeActions />
        </BoxEaseIn>
      </Container>
    </Flex>
  );
}
