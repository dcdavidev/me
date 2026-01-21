import { Box, Container, Flex, Heading, Text } from '@radix-ui/themes';

import { BoxEaseIn } from '@repo/shared-ui-components';

export function TechStack() {
  return (
    <Box id="tech-stack">
      <BoxEaseIn>
        <Container size="4">
          <Heading size="8" mb="6" align="center">
            Tech Stack
          </Heading>
          <Flex justify="center" align="center" gap="4" mb="8">
            <Flex direction="column" align="center">
              <i className="ci ci-javascript ci-2x"></i>
              <Text as="span" align="center">
                Javascript
              </Text>
            </Flex>
            <Flex direction="column" align="center">
              <i className="ci ci-typescript ci-2x"></i>
              <Text as="span" align="center">
                Typescript
              </Text>
            </Flex>
            <Flex direction="column" align="center">
              <i className="ci ci-nodejs ci-2x"></i>
              <Text as="span" align="center">
                Node.js
              </Text>
            </Flex>
            <Flex direction="column" align="center">
              <i className="ci ci-expressjs ci-2x ci-invert"></i>
              <Text as="span" align="center">
                Express.js
              </Text>
            </Flex>
            <Flex direction="column" align="center">
              <i className="ci ci-react ci-2x"></i>
              <Text as="span" align="center">
                React.js
              </Text>
            </Flex>
            <Flex direction="column" align="center">
              <i className="ci ci-reactrouter ci-2x ci-invert"></i>
              <Text as="span" align="center">
                React Router
              </Text>
            </Flex>
            <Flex direction="column" align="center">
              <i className="ci ci-astro ci-2x ci-invert"></i>
              <Text as="span" align="center">
                Astro
              </Text>
            </Flex>
          </Flex>
        </Container>
      </BoxEaseIn>
    </Box>
  );
}
