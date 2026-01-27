import { DotLottieReact as Player } from '@lottiefiles/dotlottie-react';
import {
  Box,
  Container,
  Flex,
  Heading,
  Separator,
  Text,
} from '@radix-ui/themes';

import { BoxEaseIn } from '@repo/shared-ui-components';

// @ts-expect-error lottie not typed
import animationData from '~/assets/animations/developer-relaxing.lottie';

export function Mission() {
  return (
    <Box id="top">
      <Container size={'4'}>
        <BoxEaseIn>
          <Heading
            size={{ initial: '8', md: '9' }}
            mb="6"
            wrap="pretty"
            style={{ fontFamily: 'var(--heading-font-family)' }}
          >
            🎯 My Mission
          </Heading>

          <Heading
            size={{ initial: '6', md: '8' }}
            mb="9"
            wrap="pretty"
            style={{ fontWeight: 'normal' }}
          >
            To bring wonderful ideas to life by simplifying the workflow and
            eliminating chaos, ensuring a smooth developer experience through
            clean, robust code.
          </Heading>
        </BoxEaseIn>

        <BoxEaseIn>
          <Separator my={'9'} style={{ width: '100%' }} />
        </BoxEaseIn>

        <BoxEaseIn>
          <Heading size={{ initial: '4', md: '6' }} mb={'4'} wrap="pretty">
            Full-Stack Development & Software Engineering
          </Heading>
          <Text>
            I transform abstract concepts into tangible, high-performance
            digital products by leveraging the full power of the TypeScript
            ecosystem. My expertise spans building dynamic user interfaces with
            React.js and robust backend logic using Node.js and Express.js. I
            don't just write code that works; I prioritize "Clean Code"
            principles to ensure every component is modular, testable, and
            maintainable. By bridging the gap between elegant design and complex
            technical functionality, I deliver software that is resilient,
            scalable, and ready to evolve alongside business needs without
            accumulating technical debt.
          </Text>
        </BoxEaseIn>

        <Box my={'9'} />

        <BoxEaseIn>
          <Heading size={{ initial: '4', md: '6' }} mb={'4'} wrap="pretty">
            Process Automation & Developer Experience (DX)
          </Heading>
          <Text>
            My core mission is to eliminate chaos from the development
            lifecycle. I deeply understand that friction kills productivity,
            which is why I dedicate myself to building custom internal tools,
            CLIs, and automation scripts that streamline daily workflows. I
            design and implement rigorous CI/CD pipelines to ensure code moves
            from development to testing and production without manual errors or
            bottlenecks. My ultimate goal is to create a "smooth developer
            experience" where I (and the team) can focus purely on solving
            business problems and innovating, rather than fighting with
            configuration or repetitive tasks.
          </Text>
        </BoxEaseIn>

        <Box my={'9'} />

        <BoxEaseIn>
          <Heading size={{ initial: '4', md: '6' }} mb={'4'} wrap="pretty">
            Scalable Server Architecture & Production Management
          </Heading>
          <Text>
            Writing the code is only half the battle; ensuring it runs reliably
            in the real world is where I truly take ownership. I design scalable
            server architectures capable of handling high loads, optimizing the
            performance of my Node.js applications for maximum efficiency. I
            actively manage deployment strategies and production environments,
            monitoring stability and security around the clock. By making
            conscious architectural choices and maintaining rigorous standards
            for infrastructure, I ensure that our "wonderful ideas" remain
            online, performant, and accessible to users at all times.
          </Text>
        </BoxEaseIn>

        <BoxEaseIn>
          <Flex justify={'center'} align={'center'} mt={'9'}>
            <Player
              src={animationData as string}
              autoplay
              loop
              style={{ maxWidth: '100%' }}
            />
          </Flex>
        </BoxEaseIn>
      </Container>
    </Box>
  );
}
