import React from 'react';

import { Em, Flex, Spinner, Text } from '@radix-ui/themes';

import { BoxEaseIn } from '../BoxEaseIn/BoxEaseIn.js';
import { SplashScreen } from '../SplashScreen/SplashScreen.js';

export const LoadingScreen: React.FC = () => {
  return (
    <SplashScreen>
      <BoxEaseIn>
        <Text as="p" align="center">
          <Em>Silent keys tapping,</Em>
        </Text>
        <Text as="p" align="center">
          <Em>logic flows like hidden streams,</Em>
        </Text>
        <Text as="p" align="center">
          <Em>dreams compile to life.</Em>
        </Text>
        <Flex align="center" justify="center" mt="6">
          <Spinner size="3" />
        </Flex>
      </BoxEaseIn>
    </SplashScreen>
  );
};
