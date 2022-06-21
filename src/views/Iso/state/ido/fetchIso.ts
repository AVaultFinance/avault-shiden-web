// import { AVAT } from 'config/constants/tokens';
import { Contract } from 'ethers';
import { useContract } from 'hooks/useContract';
import { idoContractAddress } from 'views/Iso/constants/constants';
import idoAbi from '../../constants/abi/idoAbi.json';
import multicall, { multicallv3 } from 'utils/multicall';
import { IFetchIsoCallback, IIsoStateEnum } from './types';
import { getERC20Balance, getETHBalance } from 'utils/contractHelpers';
import { Web3Provider } from '@ethersproject/providers';
import { BSC_BLOCK_TIME } from 'config';
import { getFullLocalDisplayBalance } from 'utils/formatBalance';
import BigNumber from 'bignumber.js';
export const fetchIso = async (
  account: string,
  library: Web3Provider,
  accountkey: string,
): Promise<IFetchIsoCallback> => {
  const obj: any = {};
  // const AVATAddress = AVAT.address;
  // // avatInIsoBalance
  // const calls01 = [{ address: AVATAddress, name: 'balanceOf', params: [idoContractAddress] }];
  // const [[avatInIsoBalance]] = await multicall(AVATAbi, calls01);
  // obj.avatInIsoBalance = avatInIsoBalance.toString();

  const calls02 = [
    { address: idoContractAddress, name: 'countedAstrAmount' },
    { address: idoContractAddress, name: 'state' },
    { address: idoContractAddress, name: 'depositStartBlock' },
    { address: idoContractAddress, name: 'depositEndBlock' },
    { address: idoContractAddress, name: 'lp' },
  ];
  const [[countedAstrAmount], [state], [depositStartBlock], [depositEndBlock], [lpAddress]] = await multicall(
    idoAbi,
    calls02,
  );
  if (countedAstrAmount) {
    obj.countedAstrAmount = getFullLocalDisplayBalance(new BigNumber(countedAstrAmount.toString()), 18);
  }

  const stateNumber = Number(state.toString());
  // startTime
  // idoState
  if (stateNumber === 0) {
    const blockNumberCallback = await library.getBlockNumber();
    const depositStartBlockNumber = Number(depositStartBlock.toString());
    const depositEndBlockNumber = Number(depositEndBlock.toString());
    if (blockNumberCallback < depositStartBlockNumber) {
      obj.idoState = IIsoStateEnum.INIT;
      obj.startTime = (depositStartBlockNumber - blockNumberCallback) * BSC_BLOCK_TIME;
    } else if (blockNumberCallback < depositEndBlockNumber) {
      obj.idoState = IIsoStateEnum.PROCING;
      obj.endTime = (depositEndBlockNumber - blockNumberCallback) * BSC_BLOCK_TIME;
    }
  } else if (stateNumber === 3) {
    obj.idoState = IIsoStateEnum.END;
  } else {
    obj.idoState = IIsoStateEnum.WAITINGGETLP;
  }
  // lpTotalBalance
  if (lpAddress !== '0x0000000000000000000000000000000000000000') {
    const lpTotalBalance = await getERC20Balance(lpAddress, library, idoContractAddress);
    if (lpTotalBalance) {
      obj.lpTotalBalance = lpTotalBalance.toString();
    }
  }
  const idoInAstrBalance = await getETHBalance(idoContractAddress, library);
  if (idoInAstrBalance) {
    obj.idoInAstrBalance = idoInAstrBalance.toString();
  }
  if (account && library) {
    const maxASTRBalance = await getETHBalance(account, library);
    if (maxASTRBalance) {
      obj.maxASTRBalance = {
        [accountkey]: maxASTRBalance.toString(),
      };
    }

    if (stateNumber === 3) {
      const calls03 = [{ address: idoContractAddress, name: 'claim', params: [account] }];
      const [[rewards]] = await multicallv3(idoAbi, calls03);
      if (rewards) {
        obj.rewards = getFullLocalDisplayBalance(new BigNumber(rewards.toString()), 18);
      }
    }
  }
  return obj;
};
export const useIsoContract = (withSignerIfPossible?: boolean): Contract | null => {
  return useContract(idoContractAddress, idoAbi, withSignerIfPossible);
};
