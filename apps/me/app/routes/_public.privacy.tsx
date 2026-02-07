import { useTranslation } from 'react-i18next';
import Markdown from 'react-markdown';

import { Box, Container, Divider, Flex, Heading } from '@pittorica/react';

import { MarkdownComponents } from '@repo/shared-ui-components';

interface PrivacySection {
  title: string;
  content: string;
}

export function meta() {
  return [{ title: 'Privacy Policy | Davide Di Criscito' }];
}

export default function PrivacyPolicy() {
  const { t } = useTranslation();

  const rawSections = t('privacy.sections', { returnObjects: true });
  const sections = Array.isArray(rawSections)
    ? (rawSections as PrivacySection[])
    : [];

  return (
    <Box mt="9">
      <Container maxWidth="md">
        <Flex direction="column" gap="6">
          <Box>
            <Heading size="8" mb="2">
              {t('privacy.title')}
            </Heading>
            <Markdown components={MarkdownComponents}>
              {t('privacy.subtitle')}
            </Markdown>
          </Box>

          <Divider variant="wave" color="white" />

          <Box>
            <Heading size="5" mb="2">
              {t('privacy.owner.title')}
            </Heading>
            <Markdown components={MarkdownComponents}>
              {t('privacy.owner.content')}
            </Markdown>
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
