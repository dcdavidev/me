import { Flex, Heading, Text } from '@radix-ui/themes';

export function meta() {
  return [{ title: 'Dashboard | Admin' }];
}

export default function Dashboard() {
  return (
    <Flex direction="column" gap="4" p="4">
      <Heading>Benvenuto nella Dashboard</Heading>
      <Text>Se vedi questo, sei autenticato.</Text>
    </Flex>
  );
}
