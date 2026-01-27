import { useNavigate } from 'react-router';

import { Box, Button, Container, Flex, Heading } from '@radix-ui/themes';

import { BoxEaseIn } from '@repo/shared-ui-components';

import { TechStackSummary } from '~/routes/_tech-stack/Summary';

export function TechStack() {
  const navigate = useNavigate();

  return (
    <Box id="tech-stack">
      <Flex justify="center" align="center" style={{ minHeight: '100vh' }}>
        <Container size={'4'}>
          <BoxEaseIn>
            <Heading
              size={{ initial: '8', md: '9' }}
              align="center"
              wrap="pretty"
            >
              Tech Stack
            </Heading>
          </BoxEaseIn>

          <TechStackSummary />

          <Box my={'9'} />

          <BoxEaseIn>
            <Flex justify={'center'} align={'center'}>
              <Button
                size={'4'}
                variant="outline"
                onClick={() => navigate('/tech-stack')}
              >
                I want to learn more
              </Button>
            </Flex>
          </BoxEaseIn>
        </Container>
      </Flex>
    </Box>
  );
}
