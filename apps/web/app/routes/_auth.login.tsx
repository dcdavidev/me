import {
  Form,
  redirect,
  useActionData,
  useNavigation,
  useSearchParams,
} from 'react-router';

import { isAxiosError } from 'axios';

import {
  Box,
  Button,
  Callout,
  Card,
  Flex,
  Heading,
  Spinner,
  Text,
  TextField,
} from '@radix-ui/themes';

import { serialize } from 'cookie';

import { BoxEaseIn } from '@repo/shared-ui-components';
import { InputOTP } from '@repo/shared-ui-components';
import { api } from '@repo/web-configs';

import backgroundImage from '~/assets/backgrounds/login.webp';

import type { Route } from './+types/_auth.login';

export function meta() {
  return [{ title: 'Login | Davide Di Criscito' }];
}

export async function action({ request }: Route.ActionArgs) {
  const formData = await request.formData();
  const intent = formData.get('intent');

  const url = new URL(request.url);
  const next = url.searchParams.get('next') || '/dashboard';

  if (intent === 'request-code') {
    const email = formData.get('email');
    if (!email || typeof email !== 'string') {
      return { error: "L'indirizzo email è obbligatorio." };
    }

    try {
      await api.post('/login', { email });
      return { step: 'verify', email, error: null };
    } catch (error) {
      console.error('[Login Server Action Error]:', error);
      let errorMessage = "Errore durante l'invio. Riprova.";

      if (isAxiosError(error)) {
        if (error.response?.status === 401) {
          errorMessage = 'Email non autorizzata.';
        } else if (error.response?.data?.message) {
          errorMessage = error.response.data.message;
        }
      }
      return { error: errorMessage };
    }
  }

  if (intent === 'verify-code') {
    const email = formData.get('email');
    const code = formData.get('code');

    if (!code || typeof code !== 'string' || code.length !== 6) {
      return {
        step: 'verify',
        email,
        error: 'Il codice deve essere di 6 cifre.',
      };
    }

    try {
      const response = await api.post('/verify', { email, code });
      const { token, expiresIn } = response.data;

      const cookieHeader = serialize('auth_token', token, {
        path: '/',
        httpOnly: false,
        secure: import.meta.env.PROD,
        sameSite: 'lax',
        maxAge: expiresIn / 1000,
      });

      return redirect(next, {
        headers: {
          'Set-Cookie': cookieHeader,
        },
      });
    } catch (error) {
      let errorMessage = 'Codice non valido o scaduto.';
      if (isAxiosError(error) && error.response?.data?.message) {
        errorMessage = error.response.data.message;
      }
      return { step: 'verify', email, error: errorMessage };
    }
  }

  return { error: 'Azione non valida.' };
}

export default function LoginPage() {
  const navigation = useNavigation();
  const [searchParams] = useSearchParams();
  const actionData = useActionData<typeof action>();
  const isSubmitting = navigation.state === 'submitting';

  const isVerifyStep = actionData?.step === 'verify';
  const email = isVerifyStep ? (actionData.email as string) : '';

  const nextParam = searchParams.get('next');
  const formAction = nextParam
    ? `/login?next=${encodeURIComponent(nextParam)}`
    : '/login';

  return (
    <Flex
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
      <Box maxWidth="450px" width="100%" mx="4">
        <BoxEaseIn>
          <Card size="4">
            <Flex direction="column" gap="5">
              <Box>
                <Heading as="h1" size="6" mb="1">
                  {isVerifyStep ? 'Codice di verifica' : 'Accesso Dashboard'}
                </Heading>
                <Text size="2" color="gray">
                  {isVerifyStep
                    ? `Abbiamo inviato un codice a ${email}`
                    : 'Inserisci la tua email per ricevere il codice.'}
                </Text>
              </Box>

              {actionData?.error && (
                <Callout.Root color="red" size="1">
                  <Callout.Text>{actionData.error}</Callout.Text>
                </Callout.Root>
              )}

              <Form method="post" action={formAction}>
                {isVerifyStep ? (
                  <Flex direction="column" gap="4" align="center">
                    <input type="hidden" name="intent" value="verify-code" />
                    <input type="hidden" name="email" value={email} />

                    <Box py="2">
                      <InputOTP
                        maxLength={6}
                        name="code"
                        disabled={isSubmitting}
                        autoComplete="one-time-code"
                      />
                    </Box>

                    <Button
                      type="submit"
                      disabled={isSubmitting}
                      size="3"
                      style={{ width: '100%' }}
                    >
                      {isSubmitting ? <Spinner /> : 'Verifica e Accedi'}
                    </Button>

                    <Button
                      variant="ghost"
                      color="gray"
                      type="button"
                      onClick={() => {
                        globalThis.location.href = '/login';
                      }}
                    >
                      Usa un'altra email
                    </Button>
                  </Flex>
                ) : (
                  <Flex direction="column" gap="4">
                    <input type="hidden" name="intent" value="request-code" />
                    <TextField.Root
                      name="email"
                      type="email"
                      placeholder="nome@esempio.com"
                      required
                      size="3"
                      autoComplete="email"
                    />
                    <Button type="submit" disabled={isSubmitting} size="3">
                      {isSubmitting ? <Spinner /> : 'Invia Codice'}
                    </Button>
                  </Flex>
                )}
              </Form>
            </Flex>
          </Card>
        </BoxEaseIn>
      </Box>
    </Flex>
  );
}
