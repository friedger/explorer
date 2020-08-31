import engine from 'store/src/store-engine';
import lclStorage from 'store/storages/localStorage';
import cookieStorage from 'store/storages/cookieStorage';
import { c32addressDecode } from 'c32check';
import { fetchTxList } from '@common/api/transactions';
import Router from 'next/router';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import { Transaction } from '@blockstack/stacks-blockchain-sidecar-types';
import { color, ColorsStringLiteral } from '@stacks/ui';
import { BorderStyleProperty } from 'csstype';

dayjs.extend(relativeTime);

export const store = engine.createStore([lclStorage]);

/**
 * Cookie names
 */
export const IDENTITY_COOKIE = 'sandbox_identity';
export const USERNAME_COOKIE = 'username';
export const COLOR_MODE_COOKIE = 'color_mode';
export const NETWORK_COOKIE = 'selected_network';

/**
 * Cookie setters
 */

const cookieSetter = engine.createStore([cookieStorage]);

export const identityStorage = cookieSetter;
export const usernameStorage = cookieSetter;
export const colorModeStorage = cookieSetter;
export const networkStorage = cookieSetter;

/**
 * validateStacksAddress
 *
 * @param {String} stacksAddress - the STX address to validate
 */
export const validateStacksAddress = (stacksAddress: string): boolean => {
  try {
    c32addressDecode(stacksAddress);
    return true;
  } catch (e) {
    return false;
  }
};

/**
 * dedupe
 *
 * @param {array} array - the array to remove duplicate items
 * @param {string} key - the key to check by for dupes, typically an id of some sort
 */
export const dedupe = (array: any[], key: string): any[] =>
  // eslint-disable-next-line @typescript-eslint/no-unsafe-return
  Array.from(new Set(array.map(a => a[key]))).map(id => {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-return
    return array.find(a => a[key] === id);
  });

/**
 * toKebabCase
 *
 * @param {string} str - string to convert_this orThis to convert-this or-this
 */
export const toKebabCase = (str: string): string => {
  if (!str) return '';
  const hasSpaces = str.includes(' ');
  const hasUnderscore = str.includes('_');
  let string = str;
  if (hasSpaces) {
    string = string.replace(' ', '-');
  }
  if (hasUnderscore) {
    string = string.replace('_', '-');
  }

  return string.toLowerCase();
};

/**
 * truncateMiddle
 *
 * @param {string} input - the string to truncate
 * @param {number} offset - the number of chars to keep on either end
 */
export const truncateMiddle = (input: string, offset = 5): string | undefined => {
  if (!input) return;
  const start = input.substr(0, offset);
  const end = input.substr(input.length - offset, input.length);
  return `${start}…${end}`;
};

/**
 * validateTxId
 *
 * @param {string} tx_id - the tx_id sha hash to validate
 */
export const validateTxId = (tx_id: string) => {
  const regex = /0x[A-Fa-f0-9]{64}/;
  return regex.exec(tx_id);
};

/**
 * validateContractName
 *
 * @param {string} contractString - the fully realized contract name to validate, ex: ST2ZRX0K27GW0SP3GJCEMHD95TQGJMKB7G9Y0X1MH.hello-world-contract
 */
export const validateContractName = (contractString: string): boolean => {
  if (!contractString.includes('.')) return false;

  const stxAddress = contractString.split('.')[0];
  const contractName = contractString.split('.')[1];
  const nameRegex = /[a-zA-Z]([a-zA-Z0-9]|[-_!?+<>=/*])*$|^[-+=/*]$|^[<>]=?$/;
  try {
    const validStacksAddress = validateStacksAddress(stxAddress);
    const validName = nameRegex.exec(contractName);
    return !!(validName && validStacksAddress);
  } catch (e) {
    return false;
  }
};

export const queryWith0x = (query: string): string =>
  !query.includes('0x') ? '0x' + query : query;

export const handleValidation = (query?: string): { success: boolean; message?: string } => {
  if (!query || !query.trim().length) {
    return {
      success: false,
      message: 'No query provided',
    };
  }

  if (query.includes('.') && validateContractName(query)) {
    return {
      success: true,
    };
  }

  if (query.includes('.') && !validateContractName(query)) {
    return {
      success: false,
      message: 'Contract name seems invalid.',
    };
  }

  if (validateTxId(queryWith0x(query))) {
    return {
      success: true,
    };
  } else {
    return {
      success: false,
      message: 'Transaction ID hash seems invalid.',
    };
  }
};

/**
 * microToStacks
 *
 * @param {Number} amountInMicroStacks - the amount of microStacks to convert
 */
export const microToStacks = (amountInMicroStacks: string | number): number =>
  amountInMicroStacks ? Number(amountInMicroStacks) / Math.pow(10, 6) : 0;

export const getContractName = (fullyRealizedName: string): string =>
  fullyRealizedName.split('.')[1];

export const getFungibleAssetName = (fullyRealizedName: string): string =>
  getContractName(fullyRealizedName).split('::')[1];

export const getAssetNameParts = (fullyRealizedName: string) => {
  const address = fullyRealizedName.split('.')[0];
  const contract = getContractName(fullyRealizedName).split('::')[0];
  const asset = getFungibleAssetName(fullyRealizedName);

  return {
    address,
    contract,
    asset,
  };
};

export const getMemoString = (string: string): string | null =>
  string ? Buffer.from(string.replace('0x', ''), 'hex').toString('utf8') : null;

export const startPad = (n: number, z = 2, s = '0'): string =>
  (n + '').length <= z ? ['', '-'][+(n < 0)] + (s.repeat(z) + Math.abs(n)).slice(-1 * z) : n + '';

export const navgiateToRandomTx = (apiServer: string) => async () => {
  const { results } = await fetchTxList({
    apiServer: apiServer,
    types: ['smart_contract', 'contract_call', 'token_transfer'],
  })();
  const hasNonCoinbaseTxs = results.some(tx => tx.tx_type !== 'coinbase');

  if (hasNonCoinbaseTxs) {
    const nonCoinbaseResults = results.filter(tx => tx.tx_type !== 'coinbase');
    const randomNonCoinbaseTx =
      nonCoinbaseResults[Math.floor(Math.random() * nonCoinbaseResults.length)];

    await Router.push('/txid/[txid]', `/txid/${randomNonCoinbaseTx.tx_id}`);

    return;
  }

  const randomTx = results[Math.floor(Math.random() * results.length)];
  await Router.push('/txid/[txid]', `/txid/${randomTx.tx_id}`);
};

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export const clarityValuetoHumanReadable = (value: any): string | null => {
  if (value && value.repr) {
    return value.repr;
  }
  return null;
};

export const addSepBetweenStrings = (strings: (string | undefined)[], sep = '∙'): string => {
  let str = '';
  strings
    .filter(_s => _s)
    .forEach((string, index, array) => {
      if (index < array.length - 1) {
        str += (string as string) + ` ${sep} `;
      } else {
        str += string;
      }
    });
  return str;
};

export const toRelativeTime = (ts: number): string => dayjs().to(ts);

export const isPendingTx = (tx: Transaction): boolean => tx && tx.tx_status === 'pending';

export const border = (
  _color: ColorsStringLiteral = 'border',
  width = 1,
  style: BorderStyleProperty = 'solid'
): string => `${width}px ${style} ${color(_color)}`;
