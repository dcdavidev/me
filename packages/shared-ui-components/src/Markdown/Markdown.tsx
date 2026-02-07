import { useState } from 'react';
import { type Components } from 'react-markdown';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
/* @ts-expect-error declaration not provided */
import vscDarkPlus from 'react-syntax-highlighter/dist/esm/styles/prism/vsc-dark-plus.js';

import { Code, Flex, IconButton, Link, Text } from '@radix-ui/themes';

import { IconCheck, IconCopy } from '@tabler/icons-react';

/**
 * Props for the CodeBlock component.
 */
interface CodeProps {
  inline?: boolean;
  className?: string;
  children?: React.ReactNode;
}

const CodeBlock = ({ inline, className, children, ...props }: CodeProps) => {
  const [copied, setCopied] = useState(false);
  const match = /language-(\w+)/.exec(className || '');
  const content = String(children).replace(/\n$/, '');
  // Fix: Safe access to language string
  const language = match?.[1] ? match[1].toUpperCase() : 'TEXT';

  const handleCopy = async () => {
    await navigator.clipboard.writeText(content);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  if (inline) {
    return (
      <Code variant="soft" color="gray" {...props}>
        {children}
      </Code>
    );
  }

  return (
    <div
      style={{
        margin: '1.5rem 0',
        borderRadius: '8px',
        overflow: 'hidden',
        position: 'relative',
      }}
    >
      <Flex
        justify="between"
        align="center"
        px="3"
        py="2"
        style={{
          backgroundColor: 'var(--gray-3)',
          borderBottom: '1px solid var(--gray-4)',
        }}
      >
        <Text size="1" color="gray" weight="bold">
          {language}
        </Text>
        <IconButton
          size="1"
          variant="ghost"
          color={copied ? 'green' : 'gray'}
          onClick={handleCopy}
          style={{ cursor: 'pointer' }}
        >
          {copied ? <IconCheck size={14} /> : <IconCopy size={14} />}
        </IconButton>
      </Flex>
      <SyntaxHighlighter
        style={vscDarkPlus}
        language={match?.[1] || 'text'}
        PreTag="div"
        showLineNumbers={true}
        lineNumberStyle={{
          minWidth: '2.5em',
          paddingRight: '1em',
          color: 'var(--gray-8)',
        }}
        customStyle={{
          margin: 0,
          padding: '1.25rem',
          fontSize: '0.875rem',
          backgroundColor: 'var(--gray-2)',
        }}
        {...props}
      >
        {content}
      </SyntaxHighlighter>
    </div>
  );
};

export const MarkdownComponents: Components = {
  p: ({ children }) => (
    <Text
      as="p"
      size="3"
      mb="4"
      style={{ lineHeight: '1.7', color: 'var(--gray-11)' }}
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
        marginBottom: '1.5rem',
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
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  code: ({ node, ...props }) => <CodeBlock {...props} />,
};
