import { Container, Flex, Heading, Separator, Text } from '@radix-ui/themes';

import { BoxEaseIn } from '@repo/shared-ui-components';

export function Stack() {
  return (
    <Container size={{ initial: '1', sm: '2', md: '4' }} mx={'4'}>
      <BoxEaseIn>
        <Flex direction={'column'} gap={'4'} id="typescript">
          <i className="ci ci-typescript ci-4x"></i>
          <Heading size={{ initial: '6', md: '8' }}>Typescript</Heading>
          <Heading size={'4'}>The Foundation of Stability</Heading>
          <Text>
            TypeScript is a strongly typed superset of JavaScript. I use it as
            my non-negotiable standard because it eliminates chaos before it
            happens. By enforcing static typing, it prevents runtime errors and
            ensures that my code is self-documenting, scalable, and easy to
            refactor without fear of breaking the build.
          </Text>
        </Flex>
      </BoxEaseIn>

      <BoxEaseIn>
        <Separator my={'9'} style={{ width: '100%' }} />
      </BoxEaseIn>

      <BoxEaseIn>
        <Flex direction={'column'} gap={'4'} id="react">
          <i className="ci ci-react ci-4x"></i>
          <Heading size={{ initial: '6', md: '8' }}>React.js</Heading>
          <Heading size={'4'}>Modular Frontend Architecture</Heading>
          <Text>
            React is a library for building user interfaces based on components.
            I choose React for its ability to break down complex UIs into
            reusable, isolated pieces. This modular approach allows me to manage
            application state efficiently and deliver a responsive, seamless
            user experience without creating spaghetti code.
          </Text>
        </Flex>
      </BoxEaseIn>

      <BoxEaseIn>
        <Separator my={'9'} style={{ width: '100%' }} />
      </BoxEaseIn>

      <BoxEaseIn>
        <Flex direction={'column'} gap={'4'} id="node">
          <i className="ci ci-node ci-4x"></i>
          <Heading size={{ initial: '6', md: '8' }}>Node.js</Heading>
          <Heading size={'4'}>High-Performance Runtime</Heading>
          <Text>
            Node.js is a JavaScript runtime built on Chrome's V8 engine. It
            allows me to unify the tech stack, using the same language for both
            frontend and backend. I rely on its non-blocking, event-driven
            architecture to build scalable network applications that can handle
            high throughput with low latency.
          </Text>
        </Flex>
      </BoxEaseIn>

      <BoxEaseIn>
        <Separator my={'9'} style={{ width: '100%' }} />
      </BoxEaseIn>

      <BoxEaseIn>
        <Flex direction={'column'} gap={'4'} id="express">
          <i className="ci ci-express ci-4x ci-invert"></i>
          <Heading size={{ initial: '6', md: '8' }}>Express.js</Heading>
          <Heading size={'4'}>Robust Backend Logic</Heading>
          <Text>
            Express is a minimal and flexible Node.js web application framework.
            I use it to structure my server-side logic and build robust RESTful
            APIs. Its simplicity gives me full control over the architecture,
            allowing me to design custom endpoints and middleware pipelines that
            fit the specific needs of the project without unnecessary overhead.
          </Text>
        </Flex>
      </BoxEaseIn>

      <BoxEaseIn>
        <Separator my={'9'} style={{ width: '100%' }} />
      </BoxEaseIn>

      <BoxEaseIn>
        <Flex direction={'column'} gap={'4'} id="reactrouter">
          <i className="ci ci-reactrouter ci-4x ci-invert"></i>
          <Heading size={{ initial: '6', md: '8' }}>React Router</Heading>
          <Heading size={'4'}>Seamless Navigation & SEO</Heading>
          <Text>
            React Router is the standard library for routing in React. I utilize
            it to manage navigation and render dynamic views, creating a fluid
            Single Page Application experience. Crucially, I leverage its
            capabilities for Server-Side Rendering (SSR), ensuring that my
            applications are not just fast, but also fully crawlable and
            SEO-friendly, making content visible to search engines without
            compromising interactivity.
          </Text>
        </Flex>
      </BoxEaseIn>

      <BoxEaseIn>
        <Separator my={'9'} style={{ width: '100%' }} />
      </BoxEaseIn>

      <BoxEaseIn>
        <Flex direction={'column'} gap={'4'} id="docker">
          <i className="ci ci-docker ci-4x"></i>
          <Heading size={{ initial: '6', md: '8' }}>Docker</Heading>
          <Heading size={'4'}>Containerization & Consistency</Heading>
          <Text>
            Docker is the open-source platform I use to containerize
            applications. It allows me to package code with all its
            dependencies, ensuring absolute consistency between development,
            testing, and production environments. By isolating services, Docker
            eliminates the 'it works on my machine' problem and serves as the
            fundamental building block for my automated deployment pipelines and
            scalable infrastructure.
          </Text>
        </Flex>
      </BoxEaseIn>
    </Container>
  );
}
