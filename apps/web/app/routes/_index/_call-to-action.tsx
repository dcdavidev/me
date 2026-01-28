import { useNavigate } from 'react-router';

import { Button, Container, Flex } from '@radix-ui/themes';

import {
  IconArrowNarrowDownDashed,
  IconBubbleTextFilled,
} from '@tabler/icons-react';

export function HomeActions() {
  const navigate = useNavigate();

  return (
    <Container size={{ initial: '1', sm: '2', md: '4' }}>
      <Flex
        gap="4"
        justify="center"
        direction={{ initial: 'column', sm: 'row' }}
      >
        -
        <Button
          size="4"
          variant="solid"
          radius="large"
          style={{ cursor: 'pointer' }}
          onClick={() => navigate('/contact-me')}
        >
          Contact Me <IconBubbleTextFilled />
        </Button>
        <Button
          size="4"
          variant="outline"
          radius="large"
          style={{ cursor: 'pointer' }}
          onClick={() => navigate('#about')}
        >
          Show More <IconArrowNarrowDownDashed />
        </Button>
      </Flex>
    </Container>
  );
}
