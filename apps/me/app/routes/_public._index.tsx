import { Trans, useTranslation } from 'react-i18next';

import { useNavigate } from 'react-router';

import { IconArrowDownDashed, IconMail } from '@tabler/icons-react';

import { Box, Button, Container, Flex, Heading } from '@pittorica/react';

import heroHome from '~/images/backgrounds/home.webp';

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
            <Button variant="filled" onClick={() => navigate('/contact-me')}>
              {t('home.top.cta.primary')} <IconMail />
            </Button>
            <Button variant="tonal" onClick={() => navigate('/#about')}>
              {t('home.top.cta.secondary')} <IconArrowDownDashed />
            </Button>
          </Flex>
        </Flex>
      </Container>
    </Box>
  );
}
