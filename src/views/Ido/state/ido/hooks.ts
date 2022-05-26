import { CHAINKEY } from '@my/sdk';
import { chainKey } from 'config';
import { chainId, main_tokens } from 'config/constants/tokens';
import { Dispatch, useEffect, useMemo } from 'react';
import { useSelector } from 'react-redux';
import { usePrice } from 'state/price/hooks';
import { State } from 'state/types';
import { useBNBBalances } from 'state/wallet/hooks';
import { idoContractAddress } from 'views/Ido/constants/constants';
import { fetchIdoAsync, updateState } from './state';
import { IIdoState } from './types';
export const useInitIdo = (dispatch: Dispatch<any>) => {
  useMainTokenPrice(dispatch);
  useBalance(dispatch);
  useUpdateAvatEstimatedPrice(dispatch);
  useEffect(() => {
    if (dispatch) {
      dispatch(fetchIdoAsync());
    }
  }, [dispatch]);
};
const useMainTokenPrice = (dispatch: Dispatch<any>) => {
  const { priceVsBusdMap } = usePrice();
  return useMemo(() => {
    if (priceVsBusdMap && dispatch) {
      const mainTokenKey = chainKey === CHAINKEY.SDN ? 'sdn' : 'astr';
      const mainTokenAddress = main_tokens[mainTokenKey].address[chainId].toLowerCase();
      if (priceVsBusdMap[mainTokenAddress]) {
        dispatch(updateState({ mainTokenAddress }));
      }
    }
  }, [priceVsBusdMap, dispatch]);
};
const useBalance = (dispatch: Dispatch<any>) => {
  const balances = useBNBBalances([idoContractAddress]);
  return useMemo(() => {
    if (balances && dispatch) {
      const idoInAstrBalance = balances[idoContractAddress];
      if (idoInAstrBalance) {
        dispatch(updateState({ idoInAstrBalance: idoInAstrBalance.toSignificant(18) }));
      }
    }
  }, [balances, dispatch]);
};
const useUpdateAvatEstimatedPrice = (dispatch: Dispatch<any>) => {
  const { idoInAstrBalance, avatInIdoBalance } = useIdoData();
  useMemo(() => {
    const idoInAstrBalanceNumber = Number(idoInAstrBalance);
    const avatInIdoBalanceNumber = Number(avatInIdoBalance);
    if (idoInAstrBalanceNumber && avatInIdoBalanceNumber) {
      dispatch(
        updateState({
          avatEstimatedPrice: (idoInAstrBalanceNumber / avatInIdoBalanceNumber).toFixed(2),
        }),
      );
    }
  }, [dispatch, idoInAstrBalance, avatInIdoBalance]);
};
export const useIdoData = (): IIdoState => {
  const idoData = useSelector((state: State) => state.ido);
  return idoData;
};
