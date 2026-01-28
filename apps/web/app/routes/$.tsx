import { useTranslation } from 'react-i18next';

import { DotLottieReact as Player } from '@lottiefiles/dotlottie-react';
import { Box, Heading } from '@radix-ui/themes';

import { BoxEaseIn, SplashScreen } from '@repo/shared-ui-components';

// @ts-expect-error lottie not typed
import animationData from '~/assets/animations/kitty-error-404.lottie';

export default function NotFound() {
  const { t } = useTranslation();

  return (
    <SplashScreen>
      <Box width="100%" maxWidth="600px" mx="auto">
        <BoxEaseIn>
          <Player
            src={animationData as string}
            autoplay
            loop
            style={{ maxWidth: '100%' }}
          />
          <Heading
            size={{ initial: '4', md: '6' }}
            align="center"
            wrap="pretty"
            mb="6"
          >
            {t('error.404.desc')}
          </Heading>
          <Heading
            size={{ initial: '8', md: '9' }}
            align="center"
            wrap="pretty"
            mb="6"
          >
            {t('error.404.title')}
          </Heading>
        </BoxEaseIn>
      </Box>
    </SplashScreen>
  );
}
