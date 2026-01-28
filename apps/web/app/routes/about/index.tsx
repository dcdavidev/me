import { DotLottieReact as Player } from '@lottiefiles/dotlottie-react';
import { Container, Flex } from '@radix-ui/themes';

import { BoxEaseIn } from '@repo/shared-ui-components';

// @ts-expect-error lottie not typed
import animationData from '~/assets/animations/developer-relaxing.lottie';

import { Mission } from './_mission';
import { Top } from './_top';

export function meta() {
  return [{ title: 'About me | Davide Di Criscito' }];
}

export default function About() {
  return (
    <Flex justify={'center'} align={'stretch'} gap={'9'} direction={'column'}>
      <Top />

      <Mission />

      <BoxEaseIn>
        <Container size={{ initial: '1', sm: '2', md: '4' }} mx={'4'}>
          <Player
            src={animationData as string}
            autoplay
            loop
            style={{ maxWidth: '100%' }}
          />
        </Container>
      </BoxEaseIn>
    </Flex>
  );
}
