import { useNavigate } from 'react-router';

import { Box, Flex, Text } from '@radix-ui/themes';

import { BoxEaseIn } from '@repo/shared-ui-components';

import { TECH_STACK_ITEMS } from './_stack-items';

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
