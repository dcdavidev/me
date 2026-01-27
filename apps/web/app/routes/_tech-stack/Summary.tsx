import { Box, Container, Flex, Text } from '@radix-ui/themes';

import { BoxEaseIn } from '@repo/shared-ui-components';

export function TechStackSummary() {
  return (
    <Box id="tech-stack" pt="9">
      <Container size="4">
        <BoxEaseIn>
          <Flex wrap="wrap" gap="4" justify="center" p="4">
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
              <i className="ci ci-docker ci-2x"></i>
              <Text as="span" align="center">
                Docker
              </Text>
            </Flex>
          </Flex>
        </BoxEaseIn>
      </Container>
    </Box>
  );
}
