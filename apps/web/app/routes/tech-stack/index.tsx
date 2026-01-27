import { Flex } from '@radix-ui/themes';

import { Stack } from './_stack';
import { Top } from './_top';

export default function TechStack() {
  return (
    <Flex justify={'center'} align={'stretch'} gap={'9'} direction={'column'}>
      <Top />

      <Stack />
    </Flex>
  );
}
