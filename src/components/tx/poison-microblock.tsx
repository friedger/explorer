import * as React from 'react';
import { Stack } from '@stacks/ui';

import { PageTop } from '@components/page';
import { Rows } from '@components/rows';

import { TransactionType } from '@models/transaction.interface';
import { TransactionDetails } from '@components/transaction-details';
import { PoisonMicroblockTransaction } from '@blockstack/stacks-blockchain-sidecar-types';

interface PoisonMicroblockPageProps {
  transaction: PoisonMicroblockTransaction;
}

const PoisonMicroblockPage = ({ transaction }: PoisonMicroblockPageProps) => (
  <>
    <PageTop status={transaction.tx_status} type={[TransactionType.POISON_MICROBLOCK]} />
    <Stack spacing="extra-loose">
      <TransactionDetails transaction={transaction} hideContract />
      <Rows
        items={[
          {
            label: {
              children: 'Header 1',
            },
            children: '8a664c1dd163643b40a4e300daffdc1ea6af493d5ee7338ada9396b63b32dedc',
          },
          {
            label: {
              children: 'Header 2',
            },
            children: '8a664c1dd163643b40a4e300daffdc1ea6af493d5ee7338ada9396b63b32dedc',
          },
        ]}
      />
    </Stack>
  </>
);

export default PoisonMicroblockPage;
