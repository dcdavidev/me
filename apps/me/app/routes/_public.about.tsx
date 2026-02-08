import { useTranslation } from 'react-i18next';

import { DotLottieReact as Player } from '@lottiefiles/dotlottie-react';

import { Box, Container, Flex, Heading, Text } from '@pittorica/react';

import backgroundImage from '~/images/backgrounds/about.webp';
import meFull from '~/images/me/full.webp';
// @ts-expect-error lottie not typed
import animationData from '~/animations/developer-relaxing.lottie';

import { Gallery } from '~/components/Gallery';

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
        align="center"
        justify="center"
        style={{
          backgroundImage: `url(${backgroundImage})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          minHeight: '100vh',
        }}
      >
        <Box>
          <Container maxWidth="md">
            <Flex
              justify="center"
              align="center"
              gap={'4'}
              direction={'column'}
            >
              <Heading size={{ initial: '8', md: '9' }} mb="6" align="center">
                Davide Di Criscito
              </Heading>

              <Heading size={{ initial: '6', md: '8' }} mb="9" align="center">
                full stack developer—powering web solutions.
              </Heading>

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
            </Flex>
          </Container>
        </Box>
      </Flex>

      <Container maxWidth="md">
        <Flex direction={'column'} gap={'9'} justify={'start'} align={'start'}>
          <Heading
            size={{ initial: '8', md: '9' }}
            mb="6"
            style={{ fontFamily: 'var(--heading-font-family)' }}
          >
            🎯 {t('about.mission.title')}
          </Heading>

          <Heading
            size={{ initial: '6', md: '8' }}
            mb="9"
            style={{ fontWeight: 'normal' }}
          >
            {t('about.mission.desc')}
          </Heading>

          <Gallery />

          {sections.map((item) => (
            <Flex direction="column" gap="6" key={item.id}>
              <Heading size={{ initial: '4', md: '6' }} mb={'4'}>
                {item.title}
              </Heading>
              <Text>{item.content}</Text>
            </Flex>
          ))}
        </Flex>
      </Container>

      <Container maxWidth="xl">
        <Player
          src={animationData as string}
          autoplay
          loop
          style={{ maxWidth: '100%' }}
        />
      </Container>
    </Flex>
  );
}
