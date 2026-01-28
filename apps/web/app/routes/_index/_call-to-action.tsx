import { useTranslation } from 'react-i18next';

import { useNavigate } from 'react-router';

import { Button, Container, Flex } from '@radix-ui/themes';

import {
  IconArrowNarrowDownDashed,
  IconMailForward,
} from '@tabler/icons-react';

export function HomeActions() {
  const navigate = useNavigate();
  const { t } = useTranslation();

  return (
    <Container size={{ initial: '1', sm: '2', md: '4' }}>
      <Flex
        gap="4"
        justify="center"
        direction={{ initial: 'column', sm: 'row' }}
      >
        -
        <Button
          size="4"
          variant="solid"
          radius="large"
          style={{ cursor: 'pointer' }}
          onClick={() => navigate('/contact-me')}
        >
          {t('home.top.cta.primary')} <IconMailForward />
        </Button>
        <Button
          size="4"
          variant="outline"
          radius="large"
          style={{ cursor: 'pointer' }}
          onClick={() => navigate('#about')}
        >
          {t('home.top.cta.secondary')} <IconArrowNarrowDownDashed />
        </Button>
      </Flex>
    </Container>
  );
}
