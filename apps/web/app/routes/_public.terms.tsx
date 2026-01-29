import { useTranslation } from 'react-i18next';
import Markdown from 'react-markdown';

import { Box, Container, Flex, Heading, Separator } from '@radix-ui/themes';

import { MarkdownComponents } from '@repo/web-components';

interface TermsSection {
  title: string;
  content: string;
}

export function meta() {
  return [{ title: 'Terms & Conditions | Davide Di Criscito' }];
}

export default function TermsAndConditions() {
  const { t } = useTranslation();

  const rawSections = t('terms.sections', { returnObjects: true });
  const sections = Array.isArray(rawSections)
    ? (rawSections as TermsSection[])
    : [];

  return (
    <Box minHeight={'100vh'}>
      <Container size="3" py="9" px="4">
        <Flex direction="column" gap="6">
          <Box>
            <Heading size="8" mb="2">
              {t('terms.title')}
            </Heading>

            <Box mt="4">
              <Markdown components={MarkdownComponents}>
                {t('terms.subtitle')}
              </Markdown>
            </Box>
          </Box>

          <Separator size="4" />

          <Flex direction="column" gap="6">
            {sections.map((section) => {
              const id = `section-${section.title.toLowerCase().replaceAll(/\s+/g, '-')}`;
              return (
                <Box key={id} id={id}>
                  <Heading size="5" mb="2" color="ruby">
                    {section.title}
                  </Heading>
                  <Markdown components={MarkdownComponents}>
                    {section.content}
                  </Markdown>
                </Box>
              );
            })}
          </Flex>
        </Flex>
      </Container>
    </Box>
  );
}
