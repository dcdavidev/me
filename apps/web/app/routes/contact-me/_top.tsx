import { Card, Container, Flex, Heading } from '@radix-ui/themes';

import { BoxEaseIn } from '@repo/shared-ui-components';

import backgroundImage from '~/assets/backgrounds/abstract-dual-expose.webp';

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
      <Container size={{ initial: '1', sm: '2', md: '4' }} mx={'4'}>
        <Flex justify="center" align="center" gap={'9'} direction={'column'}>
          <BoxEaseIn>
            <Heading
              size={{ initial: '8', md: '9' }}
              align="center"
              wrap="pretty"
            >
              Contact Me
            </Heading>
          </BoxEaseIn>

          <BoxEaseIn>
            <Card>hikjgbkjhgkjhg</Card>
          </BoxEaseIn>
        </Flex>
      </Container>
    </Flex>
  );
}
