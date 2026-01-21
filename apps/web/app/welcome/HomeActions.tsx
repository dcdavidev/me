import { useState } from 'react';

import { useNavigate } from 'react-router';

import { Button, Dialog, Flex } from '@radix-ui/themes';

import {
  IconArrowNarrowDownDashed,
  IconBubbleTextFilled,
} from '@tabler/icons-react';

import { ContactDialog } from './ContactDialog';

export function HomeActions() {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);

  return (
    <Flex gap="4" justify="center">
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
  );
}
