import { Form, useActionData, useNavigation } from 'react-router';

import {
  Box,
  Button,
  Callout,
  Card,
  Flex,
  Heading,
  Text,
  TextArea,
  TextField,
} from '@radix-ui/themes';

import { IconAlertTriangle, IconCircleCheck } from '@tabler/icons-react';

import { BoxEaseIn } from '@repo/shared-ui-components';
import { api } from '@repo/web-configs';

import backgroundImage from '~/assets/backgrounds/abstract-dual-expose.webp';

import type { Route } from '../contact-me/+types';

interface ActionResponse {
  ok: boolean;
  message?: string;
  timestamp: number;
}

export function meta() {
  return [
    { title: 'Contact Me | Davide Di Criscito' },
    {
      name: 'description',
      content:
        "Fill out the form below and I'll get back to you as soon as possible.",
    },
  ];
}

export async function action({ request }: Route.ActionArgs) {
  const formData = await request.formData();
  const payload = Object.fromEntries(formData);

  try {
    const { data } = await api.post('/contact-me', payload);
    return { ...data, ok: true, timestamp: Date.now() };
  } catch (error: unknown) {
    console.error('❌ Error submitting form:', error);

    const message =
      (error as { response?: { data?: { message?: string } } })?.response?.data
        ?.message || 'Failed to connect to server';
    return {
      message,
      ok: false,
      timestamp: Date.now(),
    };
  }
}

export default function ContactMe() {
  const actionData = useActionData() as ActionResponse | undefined;
  const navigation = useNavigation();
  const isSubmitting = navigation.state === 'submitting';

  return (
    <Flex
      id="top"
      position="relative"
      overflow="hidden"
      align="center"
      justify="center"
      style={{
        backgroundImage: `url(${backgroundImage})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        minHeight: '100vh',
      }}
    >
      <Box maxWidth={'600px'} mx="4">
        <BoxEaseIn>
          <Heading
            size={{ initial: '8', md: '9' }}
            align="center"
            wrap="pretty"
            mb="6"
          >
            Contact Me
          </Heading>
        </BoxEaseIn>

        <Box width="100%" maxWidth="600px" mx="auto">
          <BoxEaseIn>
            <Card size="3" style={{ width: '100%', maxWidth: '100%' }}>
              <Heading size={'4'} wrap="pretty" align="center" mb={'4'}>
                Fill out the form below and I'll get back to you as soon as
                possible.
              </Heading>

              <Form method="post">
                <Flex direction="column" gap="3">
                  <label>
                    <Text as="div" size="2" mb="1" weight="bold">
                      Name
                    </Text>
                    <TextField.Root
                      name="name"
                      placeholder="Your name"
                      required
                      suppressHydrationWarning
                    />
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
                      suppressHydrationWarning
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
                      suppressHydrationWarning
                    />
                  </label>
                </Flex>

                <Flex gap="3" mt="4" justify="end">
                  <Button type="submit" disabled={isSubmitting}>
                    {isSubmitting ? 'Sending...' : 'Send Message'}
                  </Button>
                </Flex>
              </Form>
            </Card>
          </BoxEaseIn>
        </Box>

        {actionData && (
          <Box mt="4">
            <BoxEaseIn>
              <Callout.Root
                color={actionData.ok ? 'green' : 'red'}
                variant="soft"
              >
                <Callout.Icon>
                  {actionData.ok ? <IconCircleCheck /> : <IconAlertTriangle />}
                </Callout.Icon>
                <Callout.Text>
                  {actionData.ok
                    ? 'Message sent successfully! I will get back to you soon.'
                    : actionData.message || 'Something went wrong.'}
                </Callout.Text>
              </Callout.Root>
            </BoxEaseIn>
          </Box>
        )}
      </Box>
    </Flex>
  );
}
