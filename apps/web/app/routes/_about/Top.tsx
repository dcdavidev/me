import {
  Box,
  Card,
  Container,
  Flex,
  Grid,
  Heading,
  Text,
} from '@radix-ui/themes';

import { BoxEaseIn } from '@repo/shared-ui-components';

import backgroundImage from '~/assets/backgrounds/abstract-blue.webp';
import meFull from '~/assets/me/full.webp';

export function Top() {
  return (
    <Box id="top">
      <Flex
        justify="center"
        align="center"
        height={'100vh'}
        style={{
          backgroundImage: `url(${backgroundImage})`,
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

          <Grid
            columns={{ initial: '1', md: '2' }}
            gap="2"
            width="auto"
            align="center"
            justify="center"
          >
            <Box>
              <Flex justify="center" align="center" height="100%">
                <BoxEaseIn>
                  <img
                    src={meFull}
                    alt="A picture of me"
                    style={{
                      width: '100%',
                      maxWidth: '300px',
                      height: 'auto',
                      borderRadius: 'var(--radius-4',
                    }}
                  />
                </BoxEaseIn>
              </Flex>
            </Box>
            <Box p="6">
              <BoxEaseIn>
                <Card>
                  <Text as="p" mb="4">
                    Hello! I'm Davide Di Criscito, a passionate full-stack web
                    developer.
                  </Text>
                  <Text as="p" mb="4">
                    I craft complex web applications with TypeScript, React.js,
                    and Node.js/Express.js. My core focus is eliminating chaos
                    by building robust CI/CD pipelines, CLIs, and dev automation
                    tools. I manage and deploy to production environments,
                    dedicated to enhancing developer workflow and delivering
                    clean, scalable server architecture.
                  </Text>
                  <Text as="p">
                    I'm always eager to take on new challenges and collaborate
                    on exciting projects. Let's connect and build something
                    amazing together!
                  </Text>
                </Card>
              </BoxEaseIn>
            </Box>
          </Grid>
        </Container>
      </Flex>
    </Box>
  );
}
