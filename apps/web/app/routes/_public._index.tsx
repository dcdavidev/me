import { Trans, useTranslation } from 'react-i18next';

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

import {
  IconArrowNarrowDownDashed,
  IconMailForward,
} from '@tabler/icons-react';

import { BoxEaseIn, BoxFadeIn } from '@repo/shared-ui-components';

import backgroundImage from '~/assets/backgrounds/home.webp';
import meFull from '~/assets/me/full.webp';

import { TechStackSummary } from '~/components/TechStackSummary';

export default function Route() {
  const navigate = useNavigate();
  const { t } = useTranslation();

  return (
    <Flex justify={'center'} align={'stretch'} gap={'9'} direction={'column'}>
      <Flex
        id="top"
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
        <Box mx={'4'}>
          <Container size={{ initial: '1', sm: '2', md: '4' }} mx="4">
            <BoxEaseIn>
              <Heading
                size={{ initial: '8', md: '9' }}
                mb="6"
                align="center"
                wrap="pretty"
              >
                <Trans i18nKey="home.top.title" components={{ 1: <u /> }} />
              </Heading>
            </BoxEaseIn>
            <BoxEaseIn>
              <Heading
                size={{ initial: '8', md: '9' }}
                mb="9"
                align="center"
                wrap="pretty"
              >
                {t('home.top.subtitle')}
              </Heading>
            </BoxEaseIn>

            <BoxEaseIn>
              <Container size={{ initial: '1', sm: '2', md: '4' }}>
                <Flex
                  gap="4"
                  justify="center"
                  direction={{ initial: 'column', sm: 'row' }}
                >
                  <Button
                    size="4"
                    variant="solid"
                    radius="large"
                    style={{ cursor: 'pointer' }}
                    onClick={() => navigate('/contact-me')}
                  >
                    {t('home.top.cta.primary')} <IconMailForward />
                  </Button>
                  <Button
                    size="4"
                    variant="outline"
                    radius="large"
                    style={{ cursor: 'pointer' }}
                    onClick={() => navigate('#about')}
                  >
                    {t('home.top.cta.secondary')} <IconArrowNarrowDownDashed />
                  </Button>
                </Flex>
              </Container>
            </BoxEaseIn>
          </Container>
        </Box>
      </Flex>

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
                  <Text
                    as="p"
                    wrap={'pretty'}
                    style={{ whiteSpace: 'pre-line' }}
                  >
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

      <Box id="tech-stack" px={'4'}>
        <Flex justify="center" align="center" style={{ minHeight: '100vh' }}>
          <Container size={{ initial: '1', sm: '2', md: '4' }}>
            <BoxEaseIn>
              <Heading
                size={{ initial: '8', md: '9' }}
                align="center"
                wrap="pretty"
                mb={'9'}
              >
                {t('home.tech-stack.title')}
              </Heading>
            </BoxEaseIn>

            <TechStackSummary />

            <Box my={'9'} />

            <BoxEaseIn>
              <Flex justify={'center'} align={'center'}>
                <Button
                  size={'4'}
                  variant="outline"
                  onClick={() => navigate('/tech-stack')}
                >
                  {t('home.tech-stack.cta.primary')}
                </Button>
              </Flex>
            </BoxEaseIn>
          </Container>
        </Flex>
      </Box>
    </Flex>
  );
}
