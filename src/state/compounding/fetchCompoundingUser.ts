import erc20ABI from 'config/abi/erc20.json';
import { ICompounding } from './types';
import BigNumber from 'bignumber.js';
import multicall from 'utils/multicall';
import masterchefABI from 'config/abi/masterchef.json';
import masterchefSdnABI from 'config/abi/masterchef_Shiden.json';
import { chainKey } from 'config';
import { CHAINKEY } from '@avault/sdk';
import { chainId } from 'config/constants/tokens';
import AVaultPCS_ABI from 'config/abi/AVaultPCS_ABI.json';

export const fetchCompoundingsFarmUserAllowances = async (account: string, compoundings: ICompounding[]) => {
  const calls = compoundings.map((compounding: ICompounding) => {
    const lpAddresses = compounding.farm.lpAddresses;
    const masterChef = compounding.contractAddress[chainId];
    return {
      address: lpAddresses,
      name: 'allowance',
      params: [account, masterChef],
    };
  });

  const rawLpAllowances = await multicall(erc20ABI, calls);
  const parsedLpAllowances = rawLpAllowances.map((lpBalance) => {
    return new BigNumber(lpBalance).toString();
  });
  return parsedLpAllowances;
};
export const fetchCompoundingsFarmUserTokenBalances = async (account: string, compoundings: ICompounding[]) => {
  const calls = compoundings.map((compounding: ICompounding) => {
    const lpAddresses = compounding.farm.lpAddresses;
    return {
      address: lpAddresses,
      name: 'balanceOf',
      params: [account],
    };
  });

  const rawTokenBalances = await multicall(erc20ABI, calls);
  const parsedTokenBalances = rawTokenBalances.map((tokenBalance, index) => {
    return new BigNumber(tokenBalance).toString();
  });
  return parsedTokenBalances;
};

export const fetchCompoundingsFarmStakedBalances = async (account: string, compoundings: ICompounding[]) => {
  const calls = compoundings.map((compounding: ICompounding) => {
    const masterChef = compounding.compounding.masterChef;
    return {
      address: masterChef,
      name: 'userInfo',
      params: [compounding.farm.pid, account],
    };
  });
  const _masterchefABI = chainKey === CHAINKEY.SDN ? masterchefSdnABI : masterchefABI;
  const rawStakedBalances = await multicall(_masterchefABI, calls);
  const parsedStakedBalances = rawStakedBalances.map((stakedBalance) => {
    return new BigNumber(stakedBalance[0]._hex).toJSON();
  });
  return parsedStakedBalances;
};
export const fetchCompoundingsFarmEarnings = async (account: string, compoundings: ICompounding[]) => {
  const calls = compoundings.map((compounding: ICompounding) => {
    const masterChef = compounding.compounding.masterChef;
    return {
      address: masterChef,
      name: 'pendingCake',
      params: [compounding.farm.pid, account],
    };
  });
  const _masterchefABI = chainKey === CHAINKEY.SDN ? masterchefSdnABI : masterchefABI;
  const rawEarnings = await multicall(_masterchefABI, calls);
  const parsedEarnings = rawEarnings.map((earnings) => {
    return new BigNumber(earnings).toJSON();
  });
  return parsedEarnings;
};

export const fetchCompoundingsUsers = async (account: string, compoundings: ICompounding[]) => {
  const calls = compoundings.map((compounding: ICompounding) => {
    return {
      address: compounding.contractAddress[chainId],
      name: 'balanceOf',
      params: [account],
    };
  });
  const rawEarnings = await multicall(AVaultPCS_ABI, calls);
  const parsedEarnings = rawEarnings.map((balances) => {
    return new BigNumber(balances).toJSON();
  });
  return parsedEarnings;
};
