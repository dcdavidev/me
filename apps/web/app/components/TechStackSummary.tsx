import { useNavigate } from 'react-router';

import { Box, Flex, Text } from '@radix-ui/themes';

import { BoxEaseIn } from '@repo/shared-ui-components';

export const TECH_STACK_ITEMS = {
  typescript: {
    icon: 'ci-typescript',
    label: 'Typescript',
    invert: false,
    link: '#section-typescript',
  },
  node: { icon: 'ci-nodejs', label: 'Node.js', invert: false, link: '#' },
  express: {
    icon: 'ci-expressjs',
    label: 'Express.js',
    invert: true,
    link: '#section-express',
  },
  react: { icon: 'ci-react', label: 'React.js', invert: false, link: '#' },
  reactrouter: {
    icon: 'ci-reactrouter',
    label: 'React Router',
    invert: false,
    link: '#section-reactrouter',
  },
  docker: {
    icon: 'ci-docker',
    label: 'Docker',
    invert: false,
    link: '#section-docker',
  },
};

export function TechStackSummary() {
  const navigate = useNavigate();
  const stackList = Object.values(TECH_STACK_ITEMS);

  return (
    <Box id="tech-stack" mx="auto" maxWidth={'600px'} px={'4'}>
      <BoxEaseIn>
        <Flex
          wrap={'wrap'}
          gap="5"
          width="auto"
          justify="center"
          align="center"
        >
          {stackList.map((item) => (
            <Flex
              key={item.label}
              direction="column"
              align="center"
              gap="2"
              onClick={() => navigate(item.link)}
            >
              <i
                className={`ci ${item.icon} ci-2x ${item.invert ? 'ci-invert' : ''}`}
              />
              <Text
                as="span"
                align="center"
                size="2"
                style={{ lineHeight: '1.2' }}
              >
                {item.label}
              </Text>
            </Flex>
          ))}
        </Flex>
      </BoxEaseIn>
    </Box>
  );
}
