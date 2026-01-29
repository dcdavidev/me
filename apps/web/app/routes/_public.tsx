import { useTranslation } from 'react-i18next';

import { Link, Outlet, useNavigate } from 'react-router';

import {
  Avatar,
  Box,
  Button,
  Card,
  Container,
  DropdownMenu,
  Flex,
  Grid,
  Heading,
  IconButton,
  Separator,
  Text,
} from '@radix-ui/themes';

import { IconArrowUpDashed, IconMailForward } from '@tabler/icons-react';

import footerBgImg from '~/assets/backgrounds/abstract-purple.webp';
import meSquared from '~/assets/me/squared.webp';

import { useCookieConsent } from '~/hooks';

export default function Layout() {
  const navigate = useNavigate();
  const { showPreferences } = useCookieConsent();
  const { i18n, t } = useTranslation();

  const languages = [
    { code: 'it', label: 'Italiano', flag: '🇮🇹' },
    { code: 'en', label: 'English', flag: '🇺🇸' },
  ];

  const currentLang =
    languages.find((l) => l.code === i18n.language) || languages[0];

  return (
    <Box>
      {/* AppBar */}
      <Box
        position="fixed"
        left="0"
        right="0"
        top="0"
        p="1"
        style={{ zIndex: 1000 }}
      >
        <Card size={'1'} style={{ padding: '4px' }}>
          <Flex direction="row" justify="center" align="center">
            <Box flexGrow="1">
              <Flex direction="row" justify="start" align="center" gap={'4'}>
                <Avatar
                  src={meSquared}
                  size="3"
                  fallback="Me"
                  radius="full"
                  ml="2"
                  onClick={() => navigate('/')}
                  style={{ cursor: 'pointer' }}
                />

                <IconButton
                  variant="ghost"
                  color="blue"
                  onClick={() => navigate('/contact-me')}
                  style={{ cursor: 'pointer' }}
                >
                  <IconMailForward />
                </IconButton>
              </Flex>
            </Box>
            <Flex gap="4" justify="center" align="center" mr="2">
              <DropdownMenu.Root>
                <DropdownMenu.Trigger>
                  <Button variant="ghost" color="gray">
                    <Flex gap="2" align="center">
                      <span>{currentLang.flag}</span>
                      <span>{currentLang.code.toUpperCase()}</span>
                    </Flex>
                  </Button>
                </DropdownMenu.Trigger>
                <DropdownMenu.Content variant="soft">
                  {languages.map((lang) => (
                    <DropdownMenu.Item
                      key={lang.code}
                      shortcut={lang.flag}
                      onClick={() => i18n.changeLanguage(lang.code)}
                    >
                      {lang.label}
                    </DropdownMenu.Item>
                  ))}
                </DropdownMenu.Content>
              </DropdownMenu.Root>

              <Separator orientation={'vertical'} />

              <IconButton
                variant="ghost"
                color="blue"
                onClick={() => window.open('https://linkedin.com/in/dcdavidev')}
                style={{ cursor: 'pointer' }}
              >
                <i className="ci ci-linkedin ci-2x"></i>
              </IconButton>
              <IconButton
                variant="ghost"
                color="gray"
                onClick={() => window.open('https://github.com/dcdavidev')}
                style={{ cursor: 'pointer' }}
              >
                <i className="ci ci-github ci-2x"></i>
              </IconButton>
            </Flex>
          </Flex>
        </Card>
      </Box>

      <main style={{ position: 'relative' }}>
        <Outlet />
      </main>

      {/* Footer */}
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
                {t('common.scroll-to-top')} <IconArrowUpDashed />
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
                  <Text
                    wrap={'pretty'}
                    align={{ initial: 'center', md: 'left' }}
                  >
                    Full Stack Developer—powering web solutions.
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
                    <Link to="/privacy">{t('common.nav.privacy')}</Link>
                    <Link to="/terms">{t('common.nav.terms')}</Link>
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
    </Box>
  );
}
