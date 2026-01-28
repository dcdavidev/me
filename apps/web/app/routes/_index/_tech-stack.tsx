import { useTranslation } from 'react-i18next';

import { useNavigate } from 'react-router';

import { Box, Button, Container, Flex, Heading } from '@radix-ui/themes';

import { BoxEaseIn } from '@repo/shared-ui-components';

import { TechStackSummary } from '~/routes/tech-stack/_summary';

export function TechStack() {
  const navigate = useNavigate();
  const { t } = useTranslation();

  return (
    <Box id="tech-stack" px={'4'}>
      <Flex justify="center" align="center" style={{ minHeight: '100vh' }}>
        <Container size={{ initial: '1', sm: '2', md: '4' }}>
          <BoxEaseIn>
            <Heading
              size={{ initial: '8', md: '9' }}
              align="center"
              wrap="pretty"
              mb={'9'}
            >
              {t('home.tech-stack.title')}
            </Heading>
          </BoxEaseIn>

          <TechStackSummary />

          <Box my={'9'} />

          <BoxEaseIn>
            <Flex justify={'center'} align={'center'}>
              <Button
                size={'4'}
                variant="outline"
                onClick={() => navigate('/tech-stack')}
              >
                {t('home.tech-stack.cta.primary')}
              </Button>
            </Flex>
          </BoxEaseIn>
        </Container>
      </Flex>
    </Box>
  );
}
