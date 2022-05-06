import { ChainId, CHAINKEY } from '@avault/sdk';
import tokens, { chainId, DOT, main_tokens } from './tokens';
import { chainKey } from 'config';
import { FarmConfig } from './types';
export const KACO_LP_PID = 0;
export const KACO_BNB_LP_PID = 1;
export const BUSD_BNB_LP_PID = 2;
export const FARM_QUOTE_QUOTE_TOKEN_SYMBOL = DOT[chainId]!.symbol;

const farms: FarmConfig[] =
  chainKey === CHAINKEY.BSC
    ? []
    : chainKey === CHAINKEY.SDN
    ? [
        {
          pid: 1,
          lpSymbol: 'AKKS',
          lpAddresses: {
            [ChainId.SDN_TESTNET]: '0x0bA819e30016Cf682C7795b44859148C65e62292',
            [ChainId.SDN_MAINNET]: '0x456C0082DE0048EE883881fF61341177FA1FEF40',
          },
          token: tokens[chainKey].kaco,
          quoteToken: main_tokens.sdn,
        },
      ]
    : [];

export default farms;
