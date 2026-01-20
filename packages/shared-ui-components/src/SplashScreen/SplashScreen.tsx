import React from 'react';

import { Flex } from '@radix-ui/themes';

export const SplashScreen: React.FC<React.PropsWithChildren> = ({
  children,
}) => {
  return (
    <Flex
      align="center"
      justify="center"
      direction="column"
      style={{
        height: '100vh',
        width: '100vw',
        position: 'relative',
      }}
    >
      {children}
    </Flex>
  );
};
