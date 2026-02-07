import { useTranslation } from 'react-i18next';

import { Outlet, useNavigate } from 'react-router';

import { IconArrowUpDashed, IconLanguage } from '@tabler/icons-react';

import {
  Avatar,
  Box,
  Button,
  Card,
  Container,
  Divider,
  DropdownMenu,
  DropdownMenuItem,
  Flex,
  Heading,
  IconButton,
  Link,
  Text,
} from '@pittorica/react';

import heroFooter from '~/images/backgrounds/footer.webp';
import meSquared from '~/images/me/squared.webp';

import { useCookieConsent } from '~/hooks/use-cookie-consent';

export default function PublicLayout() {
  const navigate = useNavigate();
  const { showPreferences } = useCookieConsent();
  const { i18n, t } = useTranslation();

  const languages = [
    { code: 'it', label: 'Italiano', flag: '🇮🇹' },
    { code: 'en', label: 'English', flag: '🇺🇸' },
  ];

  return (
    <Box id="top">
      {/* AppBar */}
      <Box
        position="fixed"
        p="1"
        m="1"
        style={{ top: 0, right: 0, left: 0, zIndex: 1000 }}
      >
        <Card p="1" translucent>
          <Flex direction="row" justify="start" align="center" gap="4">
            <Box style={{ flexGrow: 1 }}>
              <Avatar
                src={meSquared}
                fallback="DC"
                onClick={() => navigate('/')}
                style={{ cursor: 'pointer' }}
              />
            </Box>
            <Flex gap="2" justify="center" align="center">
              <IconButton
                variant="text"
                onClick={() => window.open('https://linkedin.com/in/dcdavidev')}
                style={{ cursor: 'pointer' }}
              >
                <i className="ci ci-linkedin ci-2x"></i>
              </IconButton>
              <IconButton
                variant="text"
                onClick={() => window.open('https://github.com/dcdavidev')}
                style={{ cursor: 'pointer' }}
              >
                <i className="ci ci-github ci-2x ci-invert"></i>
              </IconButton>
              <DropdownMenu
                itemCount={languages.length}
                renderTrigger={({ ref, onClick }) => (
                  <span
                    ref={ref as React.RefObject<HTMLSpanElement>}
                    onClick={onClick}
                  >
                    <IconButton variant="filled">
                      <IconLanguage size={16} />
                    </IconButton>
                  </span>
                )}
              >
                {languages.map((lang, index) => (
                  <DropdownMenuItem
                    key={lang.code}
                    onClick={() => i18n.changeLanguage(lang.code)}
                    index={index}
                  >
                    {lang.label}
                  </DropdownMenuItem>
                ))}
              </DropdownMenu>
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
        gap="6"
        style={{
          minHeight: '100vh',
          position: 'relative',
          backgroundImage: `url(${heroFooter})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        <Box pt={'4'} pb="4" width={'100%'}>
          <Container maxWidth="md">
            <Flex justify={'center'} align={'center'} pr={'9'} pl="9">
              <Button onClick={() => navigate('#top')}>
                {t('common.scroll-to-top')} <IconArrowUpDashed />
              </Button>
            </Flex>

            <Card mt="6" mb="6" p="4" translucent>
              <Flex direction="column" gap="6">
                <Flex
                  direction={'column'}
                  justify={'center'}
                  align="center"
                  gap={'2'}
                >
                  <Heading size={{ initial: '4', md: '6' }} align={'center'}>
                    Davide Di Criscito
                  </Heading>
                  <Text align={'center'}>
                    Full Stack Developer—powering web solutions.
                  </Text>
                </Flex>

                <Divider variant="wave" color="white" />

                <Flex gap="6" direction="row" justify="center" align="start">
                  <Flex direction={'column'} justify={'start'} gap={'2'}>
                    <Link href={'/'}>{t('common.nav.home')}</Link>
                    <Link href={'/about'}>{t('common.nav.about')}</Link>
                    <Link href={'/contact-me'}>{t('common.nav.contact')}</Link>
                    <Link href={'/tech-stack'}>
                      {t('common.nav.tech-stack')}
                    </Link>
                  </Flex>

                  <Flex direction={'column'} justify={'start'} gap={'2'}>
                    <Link
                      href={'#'}
                      onClick={(e) => {
                        e.preventDefault();
                        showPreferences();
                      }}
                    >
                      {t('common.nav.cookie-pref')}
                    </Link>
                    <Link href="/privacy">{t('common.nav.privacy')}</Link>
                    <Link href="/terms">{t('common.nav.terms')}</Link>
                  </Flex>
                </Flex>
              </Flex>
            </Card>

            <Container maxWidth="sm">
              <Flex
                justify={'center'}
                align={'center'}
                direction={'column'}
                gap={'4'}
              >
                <Text align={'center'}>
                  Davide Di Criscito -{' '}
                  {t('common.footer.vat', { vat: '04737220980' })}
                </Text>
                <Text align={'center'}>
                  {t('common.footer.source-code')}{' '}
                  <Link href="https://github.com/dcdavidev/me" target="_blank">
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
