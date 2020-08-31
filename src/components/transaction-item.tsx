import React from 'react';
import { useHarmonicIntervalFn } from 'react-use';
import { Flex, Box, BlockstackIcon, FlexProps, BoxProps } from '@stacks/ui';
import { Tag } from '@components/tags';
import { microToStacks, truncateMiddle, toRelativeTime, addSepBetweenStrings } from '@common/utils';
import { Transaction, TransactionType } from '@models/transaction.interface';
import { Caption, Title } from '@components/typography';
import { getContractName } from '@common/utils';
import { DefaultContract } from '@components/icons/default-contract';
import { color } from '@components/color-modes';

export const ItemIcon = React.memo(
  ({
    type,
    opacity,
    status,
    ...rest
  }: { type: Transaction['tx_type']; status: Transaction['tx_status'] } & FlexProps) => {
    let Icon = BlockstackIcon;
    if (type === 'smart_contract' || type === 'contract_call') {
      Icon = DefaultContract;
    }

    const getStatusColor = () => {
      if (status === 'success') return color('feedback-success');
      if (status === 'pending') return color('feedback-alert');
      return color('feedback-error');
    };
    return (
      <Flex
        align="center"
        justify="center"
        size="40px"
        borderRadius="8px"
        position="relative"
        display={['none', 'none', 'flex']}
        border="1px solid var(--colors-border)"
        bg="var(--colors-bg)"
        {...rest}
      >
        <Box
          bottom="0px"
          right="0px"
          position="absolute"
          bg={getStatusColor()}
          borderRadius="8px"
          size="8px"
          zIndex={9}
        />

        <Icon position="relative" zIndex={2} size="20px" />
      </Flex>
    );
  }
);

export interface TxItemProps extends FlexProps {
  tx: Transaction;
  isFocused?: boolean;
  isHovered?: boolean;
  target?: string;
  onClick?: any;
  onFocus?: any;
  onBlur?: any;
  tabIndex?: any;
}

const getTitle = (transaction: Transaction) => {
  switch (transaction.tx_type) {
    case 'smart_contract':
      return getContractName(transaction.smart_contract.contract_id);
    case 'contract_call':
      return getContractName(transaction.contract_call.contract_id);
    case 'token_transfer':
      return 'Token transfer';
    default:
      return truncateMiddle(transaction.tx_id, 10);
  }
};

const getCaption = (tx: Transaction) => {
  const date =
    typeof (tx as any).burn_block_time !== 'undefined'
      ? toRelativeTime((tx as any).burn_block_time * 1000)
      : 'Pending...';

  const truncatedId = truncateMiddle(tx.tx_id, 4);

  switch (tx.tx_type) {
    case 'smart_contract':
      return addSepBetweenStrings([date, truncatedId]);
    case 'contract_call':
      return addSepBetweenStrings([date, truncatedId]);
    case 'token_transfer':
      return addSepBetweenStrings([date, microToStacks(tx.token_transfer.amount) + ' STX']);
    default:
      return date;
  }
};

const ItemCaption = React.memo(({ tx }: { tx: Transaction }) => {
  const caption = getCaption(tx);
  return <Caption>{caption}</Caption>;
});

export const TxItem = React.forwardRef(
  ({ tx, isHovered, isFocused, ...rest }: TxItemProps, ref: any) => {
    return (
      <Flex
        px="base"
        justifyContent="space-between"
        alignItems="center"
        height="64px"
        style={{ outline: 'none' }}
        flexShrink={0}
        ref={ref}
        cursor={isHovered ? ['unset', 'unset', 'pointer'] : undefined}
        {...rest}
      >
        <Flex align="center">
          <Box display={['none', 'none', 'block']} color="var(--colors-invert)" mr="base">
            <ItemIcon status={tx.tx_status} type={tx.tx_type} />
          </Box>
          <Flex flexDirection="column">
            <Title
              textDecoration={isFocused || isHovered ? 'underline' : 'unset'}
              fontSize="14px"
              fontWeight={500}
              display="block"
            >
              {getTitle(tx)}
            </Title>
            <ItemCaption tx={tx} />
          </Flex>
        </Flex>
        <Box>
          <Tag type={tx.tx_type as TransactionType} />
        </Box>
      </Flex>
    );
  }
);
