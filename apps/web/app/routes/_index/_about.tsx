import { useTranslation } from 'react-i18next';

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
  const { t } = useTranslation();

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
                  alt="Davide DC"
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
              <Flex direction={'column'} gap={'6'}>
                <Heading size="7" align={{ initial: 'center', md: 'left' }}>
                  {t('home.about.title')}
                </Heading>
                <Text as="p" wrap={'pretty'} style={{ whiteSpace: 'pre-line' }}>
                  {t('home.about.desc')}
                </Text>
                <Button
                  size={'4'}
                  variant="soft"
                  onClick={() => navigate('/about')}
                >
                  {t('home.about.cta.primary')}
                </Button>
              </Flex>
            </BoxEaseIn>
          </Grid>
        </Flex>
      </Container>
    </Box>
  );
}
