import { Flex } from '@radix-ui/themes';

import { About } from './_about';
import { TechStack } from './_tech-stack';
import { Top } from './_top';

export default function Route() {
  return (
    <Flex justify={'center'} align={'stretch'} gap={'9'} direction={'column'}>
      <Top />
      <About />
      <TechStack />
    </Flex>
  );
}
