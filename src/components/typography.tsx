import * as React from 'react';
import { Text as BaseText, BoxProps } from '@stacks/ui';
import { forwardRefWithAs, memoWithAs } from '@stacks/ui-core';

export const Text = forwardRefWithAs<BoxProps, 'span'>(({ as = 'span', ...rest }, ref) => (
  <BaseText as={as} ref={ref} color="var(--colors-text-body)" {...rest} />
));

export const Caption: React.FC<BoxProps> = forwardRefWithAs<BoxProps, 'span'>((props, ref) => (
  <Text
    style={{ userSelect: 'none' }}
    color="var(--colors-text-caption)"
    fontSize="12px"
    lineHeight="16px"
    display="inline-block"
    ref={ref}
    {...props}
  />
));

export const Title: React.FC<BoxProps> = forwardRefWithAs<BoxProps, 'span'>((props, ref) => (
  <Text ref={ref} display="inline-block" {...props} color="var(--colors-text-title)" />
));

export const SectionTitle: React.FC<BoxProps> = forwardRefWithAs<BoxProps, 'span'>((props, ref) => (
  <Title ref={ref} lineHeight="28px" fontSize="20px" fontWeight="500" {...props} />
));

export const Pre = memoWithAs<BoxProps, 'pre'>(
  forwardRefWithAs<BoxProps, 'pre'>(({ as = 'pre', ...props }, ref) => (
    <Text
      fontFamily={`"Fira Code", monospace`}
      bg="var(--colors-bg-light)"
      borderRadius="3px"
      px="extra-tight"
      border="1px solid var(--colors-border)"
      fontSize="12px"
      ref={ref}
      {...props}
      style={{
        wordBreak: 'break-word',
      }}
    />
  ))
);

type LinkProps = BoxProps & Partial<React.AnchorHTMLAttributes<HTMLAnchorElement>>;

export const Link = React.forwardRef(({ _hover = {}, ...props }: LinkProps, ref) => (
  <Text
    _hover={{
      textDecoration: 'underline',
      ..._hover,
    }}
    ref={ref}
    {...props}
  />
));
