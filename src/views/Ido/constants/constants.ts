import { ChainId } from '@my/sdk';
import { chainId } from 'config/constants/tokens';

export const idoStartTime = '2023-01-18 23:59:59';
export const idoEndDate = '2023-01-18 23:59:59';
const _idoContractAddress: { [chainId: number]: string } = {
  [ChainId.SDN_MAINNET]: '0x616B0aBF8e50b4Ae87ff006d4136a2b12c10e750',
};
export const idoContractAddress = _idoContractAddress[chainId];
