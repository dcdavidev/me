import { useTranslation } from 'react-i18next';

import { Card, Container, Flex, Heading, Text } from '@radix-ui/themes';

import { BoxEaseIn } from '@repo/shared-ui-components';

import { TECH_STACK_ITEMS } from './_stack-items';

type TechStackKey = keyof typeof TECH_STACK_ITEMS;

interface SectionItem {
  id: string;
  icon: string;
  iconInvert: boolean;
  title: string;
  subtitle: string;
  content: string;
}

export function Stack() {
  const { t } = useTranslation();
  const rawSections = t('tech-stack.sections', { returnObjects: true });
  const sections = Array.isArray(rawSections)
    ? (rawSections as SectionItem[])
    : [];

  return (
    <Container size={{ initial: '1', sm: '2', md: '4' }} mx={'4'} mb={'9'}>
      <Flex gap={'6'} direction={'column'}>
        {sections.map((item) => {
          const config = TECH_STACK_ITEMS[item.id as TechStackKey];
          if (!config) return null;

          return (
            <BoxEaseIn key={`section-${item.id}`} id={`section-${item.id}`}>
              <Card size={{ initial: '1', md: '3' }}>
                <Flex direction={'column'} gap={'4'}>
                  <i
                    className={`ci ci-4x ${config.icon} ${
                      config.invert ? 'ci-invert' : ''
                    } `}
                  ></i>
                  <Heading size={{ initial: '6', md: '8' }} wrap="pretty">
                    {item.title}
                  </Heading>
                  <Heading size={'4'} wrap="pretty">
                    {item.subtitle}
                  </Heading>
                  <Text wrap="pretty">{item.content}</Text>
                </Flex>
              </Card>
            </BoxEaseIn>
          );
        })}
      </Flex>
    </Container>
  );
}
