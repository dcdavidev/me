import { useTranslation } from 'react-i18next';

import { Box, Container, Flex, Heading, Text } from '@radix-ui/themes';

import { BoxEaseIn } from '@repo/shared-ui-components';

interface SectionItem {
  id: number;
  title: string;
  content: string;
}

export function Mission() {
  const { t } = useTranslation();
  const rawSections = t('about.sections', { returnObjects: true });
  const sections = Array.isArray(rawSections)
    ? (rawSections as SectionItem[])
    : [];

  return (
    <Box id="top">
      <Container size={{ initial: '1', sm: '2', md: '4' }} mx={'4'}>
        <Flex direction={'column'} gap={'9'} justify={'start'} align={'start'}>
          <BoxEaseIn>
            <Heading
              size={{ initial: '8', md: '9' }}
              mb="6"
              wrap="pretty"
              style={{ fontFamily: 'var(--heading-font-family)' }}
            >
              🎯 {t('about.mission.title')}
            </Heading>

            <Heading
              size={{ initial: '6', md: '8' }}
              mb="9"
              wrap="pretty"
              style={{ fontWeight: 'normal' }}
            >
              {t('about.mission.desc')}
            </Heading>
          </BoxEaseIn>

          {sections.map((item) => (
            <BoxEaseIn key={`about-section-${item.id}`}>
              <Heading size={{ initial: '4', md: '6' }} mb={'4'} wrap="pretty">
                {item.title}
              </Heading>
              <Text wrap="pretty">{item.content}</Text>
            </BoxEaseIn>
          ))}
        </Flex>
      </Container>
    </Box>
  );
}
