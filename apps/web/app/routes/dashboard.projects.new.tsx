import { useState } from 'react';

import { Form, redirect, useActionData, useNavigation } from 'react-router';

import { isAxiosError } from 'axios';

import {
  Box,
  Button,
  Callout,
  Card,
  Flex,
  Grid,
  Heading,
  Inset,
  Separator,
  Spinner,
  Tabs,
  Text,
  TextArea,
  TextField,
} from '@radix-ui/themes';

import { parse } from 'cookie';

import { api } from '@repo/web-configs';

import type { Route } from './+types/dashboard.projects.new';

export async function action({ request }: Route.ActionArgs) {
  const cookieHeader = request.headers.get('Cookie');
  const cookies = parse(cookieHeader || '');
  const token = cookies.auth_token;

  if (!token) {
    return {
      /* cspell:disable-next-line */
      error: 'Sessione scaduta o non valida. Effettua nuovamente il login.',
    };
  }

  const formData = await request.formData();

  const payload = {
    name: formData.get('name'),
    slug: formData.get('slug'),
    homepageUrl: formData.get('homepageUrl'),
    repoUrl: formData.get('repoUrl'),
    logo: formData.get('logo_base64'),
    banner: formData.get('banner_base64'),
    token,
    translations: [
      {
        language: 'it',
        shortDescription: formData.get('shortDescription_it'),
        body: formData.get('body_it'),
      },
      {
        language: 'en',
        shortDescription: formData.get('shortDescription_en'),
        body: formData.get('body_en'),
      },
    ],
  };

  try {
    await api.post('/projects', payload);

    return redirect('/dashboard/projects');
  } catch (error: unknown) {
    /* cspell:disable-next-line */
    let message = 'Si è verificato un errore imprevisto.';

    if (isAxiosError(error)) {
      message =
        typeof error.response?.data?.error === 'string'
          ? error.response.data.error
          : error.message;

      if (error.response?.status === 401) {
        /* cspell:disable-next-line */
        message = 'Non autorizzato. Effettua nuovamente il login.';
      }
    } else if (error instanceof Error) {
      message = error.message;
    }

    return { error: String(message) };
  }
}

export default function NewProjectPage() {
  const navigation = useNavigation();
  const actionData = useActionData<typeof action>();
  const isSubmitting = navigation.state === 'submitting';

  const [images, setImages] = useState({ logo: '', banner: '' });
  const [translations, setTranslations] = useState({
    it: { shortDescription: '', body: '' },
    en: { shortDescription: '', body: '' },
  });

  const handleTranslationChange = (
    lang: 'it' | 'en',
    field: 'shortDescription' | 'body',
    value: string
  ) => {
    setTranslations((prev) => ({
      ...prev,
      [lang]: { ...prev[lang], [field]: value },
    }));
  };

  const handleFileChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    type: 'logo' | 'banner'
  ) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () =>
        setImages((prev) => ({ ...prev, [type]: reader.result as string }));
      reader.readAsDataURL(file);
    }
  };

  return (
    <Box p="4">
      <Heading size="8" mb="4">
        {/* cspell:disable-next-line */}
        Nuovo Progetto
      </Heading>

      {actionData?.error && typeof actionData.error === 'string' && (
        <Callout.Root color="red" mb="4" size="1">
          <Callout.Text>{actionData.error}</Callout.Text>
        </Callout.Root>
      )}

      <Form method="post">
        {/* Persistent Hidden Inputs */}
        <input type="hidden" name="logo_base64" value={images.logo} />
        <input type="hidden" name="banner_base64" value={images.banner} />
        <input
          type="hidden"
          name="shortDescription_it"
          value={translations.it.shortDescription}
        />
        <input type="hidden" name="body_it" value={translations.it.body} />
        <input
          type="hidden"
          name="shortDescription_en"
          value={translations.en.shortDescription}
        />
        <input type="hidden" name="body_en" value={translations.en.body} />

        <Flex direction="column" gap="4">
          <Card size="3">
            <Flex direction="column" gap="3">
              {/* cspell:disable-next-line */}
              <Heading size="4">Dati Generali</Heading>
              <Grid columns={{ initial: '1', sm: '2' }} gap="3">
                <Box>
                  <Text as="div" size="2" mb="1" weight="bold">
                    {/* cspell:disable-next-line */}
                    Nome Progetto
                  </Text>
                  <TextField.Root name="name" required />
                </Box>
                <Box>
                  <Text as="div" size="2" mb="1" weight="bold">
                    Slug
                  </Text>
                  <TextField.Root name="slug" required />
                </Box>
                <Box>
                  <Text as="div" size="2" mb="1" weight="bold">
                    Homepage URL
                  </Text>
                  <TextField.Root
                    name="homepageUrl"
                    placeholder="https://..."
                  />
                </Box>
                <Box>
                  <Text as="div" size="2" mb="1" weight="bold">
                    Repository URL
                  </Text>
                  <TextField.Root
                    name="repoUrl"
                    placeholder="https://github.com/..."
                  />
                </Box>
              </Grid>

              <Separator size="4" my="2" />

              <Grid columns={{ initial: '1', sm: '2' }} gap="4">
                <Box>
                  <Text as="div" size="2" mb="2" weight="bold">
                    Logo
                  </Text>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => handleFileChange(e, 'logo')}
                  />
                  {images.logo && (
                    <Card variant="surface" mt="2" style={{ maxWidth: 100 }}>
                      <Inset clip="padding-box" side="all">
                        <img
                          src={images.logo}
                          alt="Logo preview"
                          style={{
                            display: 'block',
                            width: '100%',
                            height: 'auto',
                          }}
                        />
                      </Inset>
                    </Card>
                  )}
                </Box>
                <Box>
                  <Text as="div" size="2" mb="2" weight="bold">
                    Banner
                  </Text>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => handleFileChange(e, 'banner')}
                  />
                  {images.banner && (
                    <Card variant="surface" mt="2">
                      <Inset clip="padding-box" side="all">
                        <img
                          src={images.banner}
                          alt="Banner preview"
                          style={{
                            display: 'block',
                            width: '100%',
                            height: 'auto',
                            maxHeight: 150,
                            objectFit: 'cover',
                          }}
                        />
                      </Inset>
                    </Card>
                  )}
                </Box>
              </Grid>
            </Flex>
          </Card>

          <Card size="3">
            <Heading size="4" mb="3">
              {/* cspell:disable-next-line */}
              Contenuti Multilingua
            </Heading>
            <Tabs.Root defaultValue="it">
              <Tabs.List>
                <Tabs.Trigger value="it">Italiano</Tabs.Trigger>
                <Tabs.Trigger value="en">English</Tabs.Trigger>
              </Tabs.List>

              <Box pt="3">
                <Tabs.Content value="it">
                  <Flex direction="column" gap="3">
                    <Box>
                      <Text as="div" size="2" mb="1" weight="bold">
                        {/* cspell:disable-next-line */}
                        Descrizione Breve (IT)
                      </Text>
                      <TextField.Root
                        value={translations.it.shortDescription}
                        onChange={(e) =>
                          handleTranslationChange(
                            'it',
                            'shortDescription',
                            e.target.value
                          )
                        }
                      />
                    </Box>
                    <Box>
                      <Text as="div" size="2" mb="1" weight="bold">
                        Body Markdown (IT)
                      </Text>
                      <TextArea
                        value={translations.it.body}
                        onChange={(e) =>
                          handleTranslationChange('it', 'body', e.target.value)
                        }
                        style={{ minHeight: 200 }}
                      />
                    </Box>
                  </Flex>
                </Tabs.Content>

                <Tabs.Content value="en">
                  <Flex direction="column" gap="3">
                    <Box>
                      <Text as="div" size="2" mb="1" weight="bold">
                        Short Description (EN)
                      </Text>
                      <TextField.Root
                        value={translations.en.shortDescription}
                        onChange={(e) =>
                          handleTranslationChange(
                            'en',
                            'shortDescription',
                            e.target.value
                          )
                        }
                      />
                    </Box>
                    <Box>
                      <Text as="div" size="2" mb="1" weight="bold">
                        Body Markdown (EN)
                      </Text>
                      <TextArea
                        value={translations.en.body}
                        onChange={(e) =>
                          handleTranslationChange('en', 'body', e.target.value)
                        }
                        style={{ minHeight: 200 }}
                      />
                    </Box>
                  </Flex>
                </Tabs.Content>
              </Box>
            </Tabs.Root>
          </Card>

          <Flex justify="end" gap="3">
            <Button
              variant="soft"
              color="gray"
              type="button"
              onClick={() => globalThis.history.back()}
            >
              {/* cspell:disable-next-line */}
              Annulla
            </Button>
            <Button type="submit" disabled={isSubmitting}>
              {/* cspell:disable-next-line */}
              {isSubmitting ? <Spinner /> : 'Salva Progetto'}
            </Button>
          </Flex>
        </Flex>
      </Form>
    </Box>
  );
}
