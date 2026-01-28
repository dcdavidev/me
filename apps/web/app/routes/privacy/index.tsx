import { useTranslation } from 'react-i18next';
import Markdown, { type Components } from 'react-markdown';

import {
  Box,
  Container,
  Flex,
  Heading,
  Link,
  Separator,
  Text,
} from '@radix-ui/themes';

import { BoxEaseIn } from '@repo/shared-ui-components';

interface PrivacySection {
  title: string;
  content: string;
}

const MarkdownComponents: Components = {
  p: ({ children }) => (
    <Text
      as="p"
      size="3"
      mb="3"
      style={{ lineHeight: '1.6', color: 'var(--gray-11)' }}
    >
      {children}
    </Text>
  ),
  strong: ({ children }) => (
    <Text weight="bold" style={{ color: 'var(--gray-12)' }}>
      {children}
    </Text>
  ),
  ul: ({ children }) => (
    <ul
      style={{
        paddingLeft: '1.5rem',
        marginBottom: '1rem',
        listStyleType: 'disc',
      }}
    >
      {children}
    </ul>
  ),
  li: ({ children }) => (
    <li style={{ marginBottom: '0.5rem', color: 'var(--gray-11)' }}>
      <Text size="3">{children}</Text>
    </li>
  ),
  a: ({ href, children }) => (
    <Link href={href} target="_blank" rel="noopener noreferrer">
      {children}
    </Link>
  ),
};

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
                    <Heading size="5" mb="2">
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
