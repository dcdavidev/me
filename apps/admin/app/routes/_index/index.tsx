import { Form, useNavigation } from 'react-router';

import { Box, Button, Card, Flex, Spinner, TextField } from '@radix-ui/themes';

import { BoxEaseIn } from '@repo/shared-ui-components';

import backgroundImage from '~/assets/backgrounds/login.webp';

export function meta() {
  return [{ title: 'Admin | Davide Di Criscito' }];
}

export default function ContactMe() {
  const navigation = useNavigation();
  const isSubmitting = navigation.state === 'submitting';

  return (
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
      <Box maxWidth={'600px'} mx="4">
        <Box width="100%" maxWidth="600px" mx="auto">
          <BoxEaseIn>
            <Card size="3" style={{ width: '100%', maxWidth: '100%' }}>
              <Form method="post">
                <Flex direction="column" gap="4" width={'100%'}>
                  <TextField.Root
                    name="email"
                    type="email"
                    placeholder="la tua email"
                    required
                    suppressHydrationWarning
                    size={'3'}
                  />

                  <Button type="submit" disabled={isSubmitting} size={'3'}>
                    {isSubmitting ? <Spinner /> : 'Accedi'}
                  </Button>
                </Flex>
              </Form>
            </Card>
          </BoxEaseIn>
        </Box>
      </Box>
    </Flex>
  );
}
