import * as React from 'react';

import { Box, Flex } from '@radix-ui/themes';

import { OTPInput } from 'input-otp';

import './styles.module.css';

type InputOTPProps = Omit<
  React.ComponentPropsWithoutRef<typeof OTPInput>,
  'render' | 'children'
> & {
  ref?: React.RefObject<React.ComponentRef<typeof OTPInput> | null>;
};

export const InputOTP = ({
  ref,
  containerClassName,
  ...props
}: InputOTPProps) => (
  <OTPInput
    ref={ref}
    containerClassName={`flex items-center gap-2 has-[:disabled]:opacity-50 ${containerClassName || ''}`}
    {...props}
    render={({ slots }) => (
      <Flex gap="2">
        {slots.map((slot, idx) => (
          // eslint-disable-next-line @eslint-react/no-array-index-key
          <Slot key={idx} {...slot} />
        ))}
      </Flex>
    )}
  />
);
InputOTP.displayName = 'InputOTP';

function Slot(props: {
  char: string | null;
  isActive: boolean;
  hasFakeCaret: boolean;
}) {
  return (
    <Flex
      align="center"
      justify="center"
      style={{
        width: '40px',
        height: '50px',
        position: 'relative',
        fontSize: 'var(--font-size-4)',
        fontWeight: 'bold',
        color: 'var(--gray-12)',
        backgroundColor: 'var(--gray-a2)',
        border: '1px solid',
        borderColor: props.isActive ? 'var(--accent-9)' : 'var(--gray-a7)',
        borderRadius: 'var(--radius-3)',
        outline: props.isActive ? '2px solid var(--accent-9)' : 'none',
        outlineOffset: '-1px',
        transition: 'all 0.15s ease',
        cursor: 'text',
      }}
    >
      {props.char}

      {props.hasFakeCaret && (
        <Box
          style={{
            position: 'absolute',
            width: '2px',
            height: '24px',
            backgroundColor: 'var(--accent-9)',
            animation: 'caret-blink 1.2s ease-in-out infinite',
          }}
        />
      )}
    </Flex>
  );
}
