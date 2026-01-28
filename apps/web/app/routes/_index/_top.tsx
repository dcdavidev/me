import { Trans, useTranslation } from 'react-i18next';

import { Box, Container, Flex, Heading } from '@radix-ui/themes';

import { BoxEaseIn } from '@repo/shared-ui-components';

import backgroundImage from '~/assets/backgrounds/abstract-brown.webp';

import { HomeActions } from './_call-to-action';

export function Top() {
  const { t } = useTranslation();

  return (
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
            <HomeActions />
          </BoxEaseIn>
        </Container>
      </Box>
    </Flex>
  );
}
