import { Box, Container, Flex, Heading } from '@radix-ui/themes';

import { BoxEaseIn } from '@repo/shared-ui-components';

import backgroundImage from '~/assets/backgrounds/code.webp';

import { TechStackSummary } from './Summary';

export function Top() {
  return (
    <Box id="top" mb={'9'}>
      <Flex
        justify="center"
        align="center"
        height={'100vh'}
        style={{
          backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.7)), url(${backgroundImage})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        <Container size="4">
          <BoxEaseIn>
            <Heading
              size={{ initial: '8', md: '9' }}
              mb="6"
              align="center"
              wrap="pretty"
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
        </Container>
      </Flex>
    </Box>
  );
}
