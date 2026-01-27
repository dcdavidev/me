import { Container, Flex, Heading } from '@radix-ui/themes';

import { BoxEaseIn } from '@repo/shared-ui-components';

import backgroundImage from '~/assets/backgrounds/code.webp';

import { TechStackSummary } from './_summary';

export function Top() {
  return (
    <Flex
      id="top"
      position="relative"
      overflow="hidden"
      align="center"
      justify="center"
      style={{
        backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.7)), url(${backgroundImage})`,
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
              mb={'-6'}
            >
              Tech Stack
            </Heading>
          </BoxEaseIn>

          <BoxEaseIn>
            <Heading
              size={{ initial: '6', md: '8' }}
              align="center"
              wrap="pretty"
            >
              the ecosystem powering my development workflow.
            </Heading>
          </BoxEaseIn>

          <TechStackSummary />
        </Flex>
      </Container>
    </Flex>
  );
}
