import { useTranslation } from 'react-i18next';

import { Box, Card, Container, Flex, Heading, Text } from '@radix-ui/themes';

import { BoxEaseIn } from '@repo/shared-ui-components';

import backgroundImage from '~/assets/backgrounds/code.webp';

import {
  TECH_STACK_ITEMS,
  TechStackSummary,
} from '~/components/TechStackSummary';

type TechStackKey = keyof typeof TECH_STACK_ITEMS;

interface SectionItem {
  id: string;
  icon: string;
  iconInvert: boolean;
  title: string;
  subtitle: string;
  content: string;
}

export function meta() {
  return [{ title: 'Tech Stack | Davide Di Criscito' }];
}

export default function TechStackRoute() {
  const { t } = useTranslation();
  const rawSections = t('tech-stack.sections', { returnObjects: true });
  const sections = Array.isArray(rawSections)
    ? (rawSections as SectionItem[])
    : [];

  return (
    <Flex justify={'center'} align={'stretch'} gap={'9'} direction={'column'}>
      <Flex
        id="top"
        position="relative"
        overflow="hidden"
        align="center"
        justify="center"
        minHeight={'100vh'}
        style={{
          backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.7)), url(${backgroundImage})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        <Box maxWidth={'600px'} mx="4">
          <Flex justify="center" align="center" gap={'9'} direction={'column'}>
            <BoxEaseIn>
              <Heading
                size={{ initial: '8', md: '9' }}
                align="center"
                wrap="pretty"
                mb={'-6'}
              >
                {t('tech-stack.title')}
              </Heading>
            </BoxEaseIn>

            <BoxEaseIn>
              <Heading
                size={{ initial: '6', md: '8' }}
                align="center"
                wrap="pretty"
              >
                {t('tech-stack.subtitle')}
              </Heading>
            </BoxEaseIn>

            <TechStackSummary />
          </Flex>
        </Box>
      </Flex>

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
    </Flex>
  );
}
