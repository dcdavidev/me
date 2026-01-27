import { useNavigate } from 'react-router';

import {
  Box,
  Button,
  Container,
  Flex,
  Grid,
  Heading,
  Text,
} from '@radix-ui/themes';

import { BoxEaseIn, BoxFadeIn } from '@repo/shared-ui-components';

import meFull from '~/assets/me/full.webp';

export function About() {
  const navigate = useNavigate();

  return (
    <Box id="about" px={'4'}>
      <Container size={{ initial: '1', sm: '2', md: '4' }}>
        <Flex
          justify="center"
          align="center"
          style={{ minHeight: '100vh' }}
          direction={'column'}
        >
          <Grid
            columns={{ initial: '1', md: '2' }}
            gap={'4'}
            width="auto"
            align="center"
            justify="center"
          >
            <Flex
              justify="center"
              align="center"
              height="100%"
              mb={{ initial: '9', md: '0' }}
            >
              <BoxFadeIn>
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
              </BoxFadeIn>
            </Flex>

            <BoxEaseIn>
              <Heading
                size="7"
                mb="4"
                align={{ initial: 'center', md: 'left' }}
              >
                About Me
              </Heading>
              <Text as="p" mb="4" wrap={'pretty'}>
                Hello! I'm Davide Di Criscito, a passionate full-stack web
                developer.
              </Text>
              <Text as="p" mb="4" wrap={'pretty'}>
                I craft complex web applications with TypeScript, React.js, and
                Node.js/Express.js. My core focus is eliminating chaos by
                building robust CI/CD pipelines, CLIs, and dev automation tools.
                I manage and deploy to production environments, dedicated to
                enhancing developer workflow and delivering clean, scalable
                server architecture.
              </Text>
              <Text as="p" wrap={'pretty'}>
                I'm always eager to take on new challenges and collaborate on
                exciting projects. Let's connect and build something amazing
                together!
              </Text>
            </BoxEaseIn>
          </Grid>

          <BoxEaseIn>
            <Flex justify={'center'} align={'center'} mt={'9'}>
              <Button
                size={'4'}
                variant="outline"
                onClick={() => navigate('/about')}
              >
                Discover more about me 🙋
              </Button>
            </Flex>
          </BoxEaseIn>
        </Flex>
      </Container>
    </Box>
  );
}
