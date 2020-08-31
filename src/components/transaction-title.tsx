import * as React from 'react';
import { Box, Stack, BoxProps, StackProps } from '@stacks/ui';

import { Status, Statuses } from '@components/status';
import { Tag, TagProps } from '@components/tags';
import { Title } from '@components/typography';

import { TransactionType } from '@models/transaction.interface';

export interface TitleProps {
  status: Statuses;
  type: TransactionType | TransactionType[];
  contractName?: string;
}

const Tags = ({ type, ...rest }: { type: TransactionType | TransactionType[] } & BoxProps) =>
  Array.isArray(type) ? (
    <Box {...rest}>
      <Stack isInline spacing="tight">
        {type.map((t: TransactionType, key) => (
          <Tag type={t} key={key} />
        ))}
      </Stack>
    </Box>
  ) : (
    <Tag type={type} {...(rest as Omit<TagProps, 'type'>)} />
  );

const TitleDetail = ({ status, type, contractName, ...rest }: TitleProps & BoxProps) => (
  <Box {...rest}>
    <Stack isInline spacing="tight">
      <Tags type={type} />
      <Status status={status} />
    </Stack>
  </Box>
);

export const TransactionTitle = ({
  status,
  type,
  contractName,
  ...rest
}: TitleProps & StackProps) => (
  <Stack spacing="base" {...rest}>
    <Box>
      <Title as="h1" textStyle="display.large" fontSize="36px">
        Transaction details
      </Title>
    </Box>
    <TitleDetail status={status} type={type} />
  </Stack>
);
