import { DotLottieReact as Player } from '@lottiefiles/dotlottie-react';
import { Heading } from '@radix-ui/themes';

import { SplashScreen } from '@repo/shared-ui-components';

// @ts-expect-error lottie not typed
import animationData from '~/assets/animations/kitty-error-404.lottie';

export default function NotFound() {
  return (
    <SplashScreen>
      <Player
        src={animationData as string}
        autoplay
        loop
        style={{ height: '250px', width: '250px' }}
      />
      <Heading size={'8'}>Page not found...</Heading>
    </SplashScreen>
  );
}
