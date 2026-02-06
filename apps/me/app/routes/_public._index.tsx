import { Box, Flex, Heading } from '@pittorica/react';

export function meta() {
  return [
    { title: 'Home || Davide Di Criscito' },
    {
      name: 'description',
      content: 'Full Stack developer: powering web solutions.',
    },
  ];
}

export default function Home() {
  return (
    <Box position="relative">
      <Flex>
        <Heading>Pronto a contruire qualcosa di unico?</Heading>
      </Flex>
    </Box>
  );
}
