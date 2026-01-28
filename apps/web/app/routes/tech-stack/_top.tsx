import { useTranslation } from 'react-i18next';

import { Box, Flex, Heading } from '@radix-ui/themes';

import { BoxEaseIn } from '@repo/shared-ui-components';

import backgroundImage from '~/assets/backgrounds/code.webp';

import { TechStackSummary } from './_summary';

export function Top() {
  const { t } = useTranslation();

  return (
    <Flex
      id="top"
      position="relative"
      overflow="hidden"
      align="center"
      justify="center"
      style={{
        backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.7)), url(${backgroundImage})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        minHeight: '100vh',
      }}
    >
      <Box maxWidth={'600px'} mx="4">
        <Flex justify="center" align="center" gap={'9'} direction={'column'}>
          <BoxEaseIn>
            <Heading
              size={{ initial: '8', md: '9' }}
              align="center"
              wrap="pretty"
              mb={'-6'}
            >
              {t('tech-stack.title')}
            </Heading>
          </BoxEaseIn>

          <BoxEaseIn>
            <Heading
              size={{ initial: '6', md: '8' }}
              align="center"
              wrap="pretty"
            >
              {t('tech-stack.subtitle')}
            </Heading>
          </BoxEaseIn>

          <TechStackSummary />
        </Flex>
      </Box>
    </Flex>
  );
}
