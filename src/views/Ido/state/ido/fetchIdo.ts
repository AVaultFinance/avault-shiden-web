import { AVAT } from 'config/constants/tokens';
import { Contract } from 'ethers';
import { useContract } from 'hooks/useContract';
import { idoContractAddress } from 'views/Ido/constants/constants';
import AVATAbi from 'config/abi/AVATAbi.json';
import idoAbi from '../../constants/abi/idoAbi.json';
import multicall from 'utils/multicall';
import { IFetchIdoCallback } from './types';
export const fetchIdo = async (): Promise<IFetchIdoCallback> => {
  const AVATAddress = AVAT.address;
  const calls = [{ address: AVATAddress, name: 'balanceOf', params: [idoContractAddress] }];
  const [[avatInIdoBalance]] = await multicall(AVATAbi, calls);
  return {
    avatInIdoBalance: avatInIdoBalance.toString(),
  };
};
export const useIdoContract = (withSignerIfPossible?: boolean): Contract | null => {
  return useContract(idoContractAddress, idoAbi, withSignerIfPossible);
};
