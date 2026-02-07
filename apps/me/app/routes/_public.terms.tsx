import { useTranslation } from 'react-i18next';
import Markdown from 'react-markdown';

import { Box, Container, Divider, Flex, Heading } from '@pittorica/react';

import { MarkdownComponents } from '@repo/shared-ui-components';

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
    <Box mt="9">
      <Container maxWidth="md">
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

          <Divider variant="wave" color="white" />

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
