import { type Components } from 'react-markdown';

import { Link, Text } from '@radix-ui/themes';

export const MarkdownComponents: Components = {
  p: ({ children }) => (
    <Text
      as="p"
      size="3"
      mb="3"
      style={{ lineHeight: '1.6', color: 'var(--gray-11)' }}
    >
      {children}
    </Text>
  ),
  strong: ({ children }) => (
    <Text weight="bold" style={{ color: 'var(--gray-12)' }}>
      {children}
    </Text>
  ),
  ul: ({ children }) => (
    <ul
      style={{
        paddingLeft: '1.5rem',
        marginBottom: '1rem',
        listStyleType: 'disc',
      }}
    >
      {children}
    </ul>
  ),
  li: ({ children }) => (
    <li style={{ marginBottom: '0.5rem', color: 'var(--gray-11)' }}>
      <Text size="3">{children}</Text>
    </li>
  ),
  a: ({ href, children }) => (
    <Link href={href} target="_blank" rel="noopener noreferrer">
      {children}
    </Link>
  ),
};
