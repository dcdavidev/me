import { DotLottieReact as Player } from '@lottiefiles/dotlottie-react';
import { Box, Heading } from '@radix-ui/themes';

import { BoxEaseIn, SplashScreen } from '@repo/shared-ui-components';

// @ts-expect-error lottie not typed
import animationData from '~/assets/animations/kitty-error-404.lottie';

export function meta() {
  return [{ title: '404 | Davide Di Criscito' }];
}

export default function NotFound() {
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
            Pagina non trovata!
          </Heading>
          <Heading
            size={{ initial: '8', md: '9' }}
            align="center"
            wrap="pretty"
            mb="6"
          >
            404
          </Heading>
        </BoxEaseIn>
      </Box>
    </SplashScreen>
  );
}
