import React from 'react';

import { Box } from '@radix-ui/themes';

import {
  Divider as PittoDivider,
  type DividerProps,
} from '@pittorica/divider-react';

import { BoxEaseIn } from '../BoxEaseIn/BoxEaseIn.js';

export const Divider: React.FC<{ variant: DividerProps['variant'] }> = ({
  variant,
}) => {
  return (
    <Box py={'9'}>
      <BoxEaseIn>
        <PittoDivider variant={variant} />
      </BoxEaseIn>
    </Box>
  );
};
