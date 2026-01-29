import { useTranslation } from 'react-i18next';
import Markdown from 'react-markdown';

import { Box, Container, Flex, Heading, Separator } from '@radix-ui/themes';

import { BoxEaseIn } from '@repo/shared-ui-components';
import { MarkdownComponents } from '@repo/web-components';

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
    <Box minHeight={'100vh'}>
      <Container size="3" py="9" px="4">
        <BoxEaseIn>
          <Flex direction="column" gap="6">
            <Box>
              <Heading size="8" mb="2">
                {t('privacy.title')}
              </Heading>
              <Markdown components={MarkdownComponents}>
                {t('privacy.subtitle')}
              </Markdown>
            </Box>

            <Separator size="4" />

            <Box>
              <Heading size="5" mb="2">
                {t('privacy.owner.title')}
              </Heading>
              <Markdown components={MarkdownComponents}>
                {t('privacy.owner.content')}
              </Markdown>
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
        </BoxEaseIn>
      </Container>
    </Box>
  );
}
