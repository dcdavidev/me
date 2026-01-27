import { Flex } from '@radix-ui/themes';

import { Stack, Top } from './_tech-stack';

export default function TechStack() {
  return (
    <Flex justify={'center'} align={'stretch'} gap={'9'} direction={'column'}>
      <Top />

      <Stack />
    </Flex>
  );
}
