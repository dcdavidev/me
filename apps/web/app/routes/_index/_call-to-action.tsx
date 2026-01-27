import { useState } from 'react';

import { useNavigate } from 'react-router';

import { Button, Container, Dialog, Flex } from '@radix-ui/themes';

import {
  IconArrowNarrowDownDashed,
  IconBubbleTextFilled,
} from '@tabler/icons-react';

import { ContactDialog } from './_contact-dialog';

export function HomeActions() {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);

  return (
    <Container size={{ initial: '1', sm: '2', md: '4' }}>
      <Flex
        gap="4"
        justify="center"
        direction={{ initial: 'column', sm: 'row' }}
      >
        <Dialog.Root open={open} onOpenChange={setOpen}>
          <Dialog.Trigger>
            <Button
              size="4"
              variant="solid"
              radius="large"
              style={{ cursor: 'pointer' }}
            >
              Contact Me <IconBubbleTextFilled />
            </Button>
          </Dialog.Trigger>

          <ContactDialog setOpen={setOpen} />
        </Dialog.Root>
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
