import { useTranslation } from 'react-i18next';

import { Link, useNavigate } from 'react-router';

import {
  Box,
  Button,
  Card,
  Container,
  Flex,
  Grid,
  Heading,
  Separator,
  Text,
} from '@radix-ui/themes';

import { IconArrowUpDashed } from '@tabler/icons-react';

import footerBgImg from '~/assets/backgrounds/abstract-purple.webp';

import { useCookieConsent } from '~/hooks';

export function Footer() {
  const navigate = useNavigate();

  // Cookie Preferences
  const { showPreferences } = useCookieConsent();

  // Locales
  const { t } = useTranslation();

  return (
    <Flex
      id="footer"
      justify={'center'}
      align={'center'}
      style={{
        minHeight: '100vh',
        position: 'relative',
        backgroundImage: `url(${footerBgImg})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      <Box px={'4'} width={'100%'}>
        <Container size={{ initial: '1', md: '4' }}>
          <Flex justify={'center'} align={'center'} py={'9'}>
            <Button color={'blue'} onClick={() => navigate('#top')}>
              back to top <IconArrowUpDashed />
            </Button>
          </Flex>
          <Card mb={'6'}>
            <Box p={'4'}>
              <Flex
                direction={'column'}
                justify={'center'}
                align={{ initial: 'center', md: 'start' }}
                gap={'2'}
              >
                <Heading
                  size={{ initial: '4', md: '6' }}
                  wrap={'pretty'}
                  align={{ initial: 'center', md: 'left' }}
                >
                  Davide Di Criscito
                </Heading>
                <Text wrap={'pretty'} align={{ initial: 'center', md: 'left' }}>
                  Full Stack Developer powering web solutions.
                </Text>
              </Flex>

              <Separator my={'6'} style={{ width: '100%' }} />

              <Grid columns={{ initial: '1', md: '2', lg: '3' }} gap="6">
                <Flex
                  direction={'column'}
                  justify={'start'}
                  align={{ initial: 'center', md: 'start' }}
                  gap={'2'}
                >
                  <Link to={'/'}>{t('common.nav.home')}</Link>
                  <Link to={'/about'}>{t('common.nav.about')}</Link>
                  <Link to={'/contact-me'}>{t('common.nav.contact')}</Link>
                  <Link to={'/tech-stack'}>{t('common.nav.tech-stack')}</Link>
                </Flex>

                <Flex
                  direction={'column'}
                  justify={'start'}
                  align={{ initial: 'center', md: 'start' }}
                  gap={'2'}
                >
                  <Link
                    to={'#'}
                    onClick={(e) => {
                      e.preventDefault();
                      showPreferences();
                    }}
                  >
                    {t('common.nav.cookie-pref')}
                  </Link>
                </Flex>
              </Grid>
            </Box>
          </Card>

          <Container size={{ initial: '1', md: '4' }}>
            <Flex
              justify={'center'}
              align={'center'}
              direction={'column'}
              gap={'4'}
            >
              <Text align={'center'} wrap="pretty">
                Davide Di Criscito -{' '}
                {t('common.footer.vat', { vat: '04737220980' })}
              </Text>
              <Text size={'1'} wrap="pretty" align={'center'}>
                {t('common.footer.source-code')}{' '}
                <Link to="https://github.com/dcdavidev/me" target="_blank">
                  GitHub
                </Link>
                .
              </Text>
            </Flex>
          </Container>
        </Container>
      </Box>
    </Flex>
  );
}
