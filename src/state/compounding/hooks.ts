import { useWeb3React } from '@web3-react/core';
import BigNumber from 'bignumber.js';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useAppDispatch } from 'state';
import { usePrice } from 'state/price/hooks';
import { CompoundingState, State } from 'state/types';
import { BIG_ZERO } from 'utils/bigNumber';
import { fetchCompoundingsPublicDataAsync, fetchCompoundingFarmUserDataAsync } from './index';
export const usePollCompoundingData = () => {
  const dispatch = useAppDispatch();
  const { priceVsBusdMap } = usePrice();
  useEffect(() => {
    dispatch(fetchCompoundingsPublicDataAsync({ priceVsBusdMap }));
  }, [dispatch, priceVsBusdMap]);
};
export const useCompoundingUserData = () => {
  const { data: compoundings } = useCompounding();
  const { account } = useWeb3React();
  const dispatch = useAppDispatch();
  useEffect(() => {
    if (account) {
      dispatch(fetchCompoundingFarmUserDataAsync({ account, compoundings }));
    }
  }, [dispatch, account, compoundings]);
};
export const useCompounding = (): CompoundingState => {
  const compounding = useSelector((state: State) => state.compounding);
  return compounding;
};
// const useCompoundingPid = (pid: number) => {
//   const compounding = useSelector((state: State) => state.compounding.data.find((f) => f.farm.pid === pid));
//   return compounding;
// };
export const useCompoundingAllTotal = () => {
  const compounding = useSelector((state: State) => state.compounding);
  return compounding.allLiquidity;
};
export const useCompoundingFarmUser = (pid?: number) => {
  try {
    const compounding = useSelector((state: State) => state.compounding.data.find((f) => f.farm.pid === pid));
    // const { farm } = useCompoundingPid(pid);
    const { farm } = compounding;
    return {
      allowance: farm.userData ? new BigNumber(farm.userData.allowance) : BIG_ZERO,
      stakingTokenBalance: farm.userData ? new BigNumber(farm.userData.stakingTokenBalance) : BIG_ZERO,
      stakedBalance: farm.userData ? new BigNumber(farm.userData.stakedBalance) : BIG_ZERO,
      pendingReward: farm.userData ? new BigNumber(farm.userData.pendingReward) : BIG_ZERO,
      avaultAddressBalance: farm.userData ? new BigNumber(farm.userData.avaultAddressBalance) : BIG_ZERO,
    };
  } catch (e) {
    return {
      allowance: BIG_ZERO,
      stakingTokenBalance: BIG_ZERO,
      stakedBalance: BIG_ZERO,
      pendingReward: BIG_ZERO,
      avaultAddressBalance: BIG_ZERO,
    };
  }
};
