import { useTranslation } from 'react-i18next';

import { DotLottieReact as Player } from '@lottiefiles/dotlottie-react';
import { Box, Container, Flex, Heading, Text } from '@radix-ui/themes';

import { BoxEaseIn } from '@repo/shared-ui-components';

import backgroundImage from '~/assets/backgrounds/about.webp';
import meFull from '~/assets/me/full.webp';
// @ts-expect-error lottie not typed
import animationData from '~/assets/animations/developer-relaxing.lottie';

interface SectionItem {
  id: number;
  title: string;
  content: string;
}

export function meta() {
  return [{ title: 'About Me| Davide Di Criscito' }];
}

export default function Route() {
  const { t } = useTranslation();
  const rawSections = t('about.sections', { returnObjects: true });
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
        style={{
          backgroundImage: `url(${backgroundImage})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          minHeight: '100vh',
        }}
      >
        <Box mx={'4'}>
          <Container size={{ initial: '1', sm: '2', md: '4' }}>
            <Flex
              justify="center"
              align="center"
              gap={'4'}
              direction={'column'}
            >
              <BoxEaseIn>
                <Heading
                  size={{ initial: '8', md: '9' }}
                  mb="6"
                  align="center"
                  wrap="pretty"
                >
                  Davide Di Criscito
                </Heading>
              </BoxEaseIn>

              <BoxEaseIn>
                <Heading
                  size={{ initial: '6', md: '8' }}
                  mb="9"
                  align="center"
                  wrap="pretty"
                >
                  full stack developer—powering web solutions.
                </Heading>
              </BoxEaseIn>

              <BoxEaseIn>
                <img
                  src={meFull}
                  alt="A picture of me"
                  style={{
                    width: '100%',
                    maxWidth: '300px',
                    height: 'auto',
                    borderRadius: 'var(--radius-4)',
                  }}
                />
              </BoxEaseIn>
            </Flex>
          </Container>
        </Box>
      </Flex>

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

      <BoxEaseIn>
        <Container size={{ initial: '1', sm: '2', md: '4' }} mx={'4'}>
          <Player
            src={animationData as string}
            autoplay
            loop
            style={{ maxWidth: '100%' }}
          />
        </Container>
      </BoxEaseIn>
    </Flex>
  );
}
