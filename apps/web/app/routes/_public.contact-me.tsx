import { useTranslation } from 'react-i18next';

import { Form, Link, useActionData, useNavigation } from 'react-router';

import {
  Box,
  Button,
  Callout,
  Card,
  Checkbox,
  Flex,
  Heading,
  Link as RadixLink,
  Text,
  TextArea,
  TextField,
} from '@radix-ui/themes';

import { IconAlertTriangle, IconCircleCheck } from '@tabler/icons-react';

import { BoxEaseIn } from '@repo/shared-ui-components';
import { api } from '@repo/web-configs';

import backgroundImage from '~/assets/backgrounds/abstract-dual-expose.webp';

import type { Route } from './+types/_public.contact-me';

interface ActionResponse {
  ok: boolean;
  code: string;
  timestamp: number;
}

export function meta() {
  return [{ title: 'Contact Me | Davide Di Criscito' }];
}

export async function action({ request }: Route.ActionArgs) {
  const formData = await request.formData();
  const payload = Object.fromEntries(formData);

  try {
    const { data } = await api.post('/contact-me', payload);
    return { ok: true, code: data.code, timestamp: Date.now() };
  } catch (error: unknown) {
    const code =
      (error as { response?: { data?: { code?: string } } })?.response?.data
        ?.code || 'SERVER_ERROR';

    return {
      ok: false,
      code: code,
      timestamp: Date.now(),
    };
  }
}

export default function ContactMe() {
  const navigation = useNavigation();

  const { t } = useTranslation();

  const actionData = useActionData() as ActionResponse | undefined;
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
            {t('contact-me.title')}
          </Heading>
        </BoxEaseIn>

        <Box width="100%" maxWidth="600px" mx="auto">
          <BoxEaseIn>
            <Card size="3" style={{ width: '100%', maxWidth: '100%' }}>
              <Heading size={'4'} wrap="pretty" align="center" mb={'4'}>
                {t('contact-me.subtitle')}
              </Heading>

              <Form method="post">
                <Flex direction="column" gap="4">
                  <label>
                    <Text as="div" size="2" mb="1" weight="bold">
                      {t('contact-me.form.name.label')}
                    </Text>
                    <TextField.Root
                      name="name"
                      placeholder={t('contact-me.form.name.placeholder')}
                      required
                      suppressHydrationWarning
                      size={'3'}
                    />
                  </label>
                  <label>
                    <Text as="div" size="2" mb="1" weight="bold">
                      {t('contact-me.form.email.label')}
                    </Text>
                    <TextField.Root
                      name="email"
                      type="email"
                      placeholder={t('contact-me.form.email.placeholder')}
                      required
                      suppressHydrationWarning
                      size={'3'}
                    />
                  </label>
                  <label>
                    <Text as="div" size="2" mb="1" weight="bold">
                      {t('contact-me.form.message.label')}
                    </Text>
                    <TextArea
                      name="message"
                      placeholder={t('contact-me.form.message.placeholder')}
                      required
                      suppressHydrationWarning
                      size={'3'}
                    />
                  </label>

                  <Text as="label" size="2">
                    <Flex gap="2" align="center">
                      <Checkbox
                        name="privacy_accepted"
                        required
                        defaultChecked={false}
                      />
                      <Text color="gray">
                        {t('contact-me.form.privacy.label')}{' '}
                        <RadixLink asChild color="ruby" weight="bold">
                          <Link to="/privacy" target="_blank">
                            {t('contact-me.form.privacy.link')}
                          </Link>
                        </RadixLink>
                        .
                      </Text>
                    </Flex>
                  </Text>
                </Flex>

                <Flex gap="3" mt="4" justify="end">
                  <Button type="submit" disabled={isSubmitting}>
                    {isSubmitting
                      ? t('contact-me.form.submit.submitting')
                      : t('contact-me.form.submit.default')}
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
                  {actionData.code
                    ? t(`contact-me.form.feedback.${actionData.code}`)
                    : t('contact-me.form.feedback.unknown_error')}
                </Callout.Text>
              </Callout.Root>
            </BoxEaseIn>
          </Box>
        )}
      </Box>
    </Flex>
  );
}
