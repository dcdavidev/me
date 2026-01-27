import { type FC } from 'react';

import { Form, useNavigation } from 'react-router';

import {
  Button,
  Dialog,
  Flex,
  Text,
  TextArea,
  TextField,
} from '@radix-ui/themes';

export const ContactDialog: FC<{ setOpen: (open: boolean) => void }> = ({
  setOpen,
}) => {
  const navigation = useNavigation();
  const isSubmitting = navigation.state === 'submitting';

  return (
    <Dialog.Content maxWidth="450px">
      <Dialog.Title>Send a message</Dialog.Title>
      <Dialog.Description size="2" mb="4">
        Fill out the form below and I'll get back to you as soon as possible.
      </Dialog.Description>

      <Form method="post" onSubmit={() => setOpen(false)}>
        <Flex direction="column" gap="3">
          <label>
            <Text as="div" size="2" mb="1" weight="bold">
              Name
            </Text>
            <TextField.Root name="name" placeholder="Your name" required />
          </label>
          <label>
            <Text as="div" size="2" mb="1" weight="bold">
              Email
            </Text>
            <TextField.Root
              name="email"
              type="email"
              placeholder="your@email.com"
              required
            />
          </label>
          <label>
            <Text as="div" size="2" mb="1" weight="bold">
              Message
            </Text>
            <TextArea
              name="message"
              placeholder="How can I help you?"
              required
            />
          </label>
        </Flex>

        <Flex gap="3" mt="4" justify="end">
          <Dialog.Close>
            <Button variant="soft" color="gray">
              Cancel
            </Button>
          </Dialog.Close>
          <Button type="submit" disabled={isSubmitting}>
            {isSubmitting ? 'Sending...' : 'Send Message'}
          </Button>
        </Flex>
      </Form>
    </Dialog.Content>
  );
};
