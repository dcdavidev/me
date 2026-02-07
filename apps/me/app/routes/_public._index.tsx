import { Trans, useTranslation } from 'react-i18next';

import { useNavigate } from 'react-router';

import { IconArrowDownDashed, IconMail } from '@tabler/icons-react';

import { Box, Button, Container, Flex, Heading, Text } from '@pittorica/react';

import heroHome from '~/images/backgrounds/home.webp';
import meFull from '~/images/me/full.webp';

import { Gallery } from '~/components/Gallery';
import { TechStackSummary } from '~/components/TechStackSummary';

export function meta() {
  return [
    { title: 'Home | Davide Di Criscito' },
    {
      name: 'description',
      content: 'Full Stack developer: powering web solutions.',
    },
  ];
}

export default function Home() {
  const { t } = useTranslation();
  const navigate = useNavigate();

  return (
    <Flex direction="column" gap="9">
      <Box
        position="relative"
        style={{
          minHeight: '100vh',
          backgroundImage: `linear-gradient(to bottom, rgba(0, 0, 0, 0.7) 0%, transparent 100%), url(${heroHome})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        <Container maxWidth="lg">
          <Flex
            direction="column"
            gap="4"
            align="center"
            justify="center"
            style={{ height: '100vh' }}
          >
            <Heading size={{ initial: '8', md: '9' }} align="center">
              <Trans i18nKey="home.top.title" components={{ 1: <u /> }} />
            </Heading>
            <Heading size={{ initial: '8', md: '9' }}>
              {t('home.top.subtitle')}
            </Heading>

            <Flex justify="between" align="center" gap="4" mt="6">
              <Button
                size="md"
                variant="filled"
                onClick={() => navigate('/contact-me')}
              >
                {t('home.top.cta.primary')} <IconMail />
              </Button>
              <Button
                size="md"
                variant="tonal"
                onClick={() => navigate('/#about')}
              >
                {t('home.top.cta.secondary')} <IconArrowDownDashed />
              </Button>
            </Flex>
          </Flex>
        </Container>
      </Box>

      <Box id="about">
        <Container maxWidth="md">
          <Flex justify="center" align="center" gap="6" basis="auto-300px">
            <Flex justify="center" align="center" height="100%">
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
            </Flex>

            <Flex direction={'column'} gap={'6'}>
              <Heading size="7">{t('home.about.title')}</Heading>
              <Text>{t('home.about.desc')}</Text>

              <Box style={{ textAlign: 'center' }}>
                <Button variant="tonal" onClick={() => navigate('/about')}>
                  {t('home.about.cta.primary')}
                </Button>
              </Box>
            </Flex>
          </Flex>
        </Container>
      </Box>

      <Gallery />

      <Box id="tech-stack" mt="9" mb="9">
        <Container maxWidth="xl">
          <Flex justify="center" align="center" direction="column" gap="9">
            <Heading size={{ initial: '8', md: '9' }} align="center">
              {t('home.tech-stack.title')}
            </Heading>

            <TechStackSummary />

            <Flex justify={'center'} align={'center'}>
              <Button
                size="md"
                variant="filled"
                onClick={() => navigate('/tech-stack')}
              >
                {t('home.tech-stack.cta.primary')}
              </Button>
            </Flex>
          </Flex>
        </Container>
      </Box>
    </Flex>
  );
}
