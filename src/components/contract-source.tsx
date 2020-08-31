import * as React from 'react';
import { Box, BoxProps } from '@stacks/ui';
import { SectionTitle } from '@components/typography';
import { CodeBlock } from '@components/code-block';

export const ContractSource = ({ source, ...rest }: { source?: string } & BoxProps) =>
  source ? (
    <Box {...rest}>
      <SectionTitle mb="base-loose">Contract source</SectionTitle>
      <CodeBlock border="1px solid var(--colors-border)" showLineNumbers code={source} />
    </Box>
  ) : null;
