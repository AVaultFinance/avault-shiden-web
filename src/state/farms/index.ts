import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import farmsConfig from 'config/constants/farms';
import isArchivedPid from 'utils/farmHelpers';
// import priceHelperLpsConfig from 'config/constants/priceHelperLps';
import fetchFarms from './fetchFarms';
import fetchFarmsPrices from './fetchFarmsPrices';
import {
  fetchFarmUserEarnings,
  fetchFarmUserAllowances,
  fetchFarmUserTokenBalances,
  fetchFarmUserStakedBalances,
} from './fetchFarmUser';
import { FarmsState, Farm } from '../types';
import { BIG_ZERO } from 'utils/bigNumber';
import BigNumber from 'bignumber.js';
import { IVault } from 'state/vault/types';

const noAccountFarmConfig = farmsConfig.map((farm) => ({
  ...farm,
  userData: {
    allowance: '0',
    tokenBalance: '0',
    stakedBalance: '0',
    earnings: '0',
  },
}));

const initialState: FarmsState = {
  data: noAccountFarmConfig,
  loadArchivedFarmsData: false,
  userDataLoaded: false,
  allLiquidity: '0',
};

export const nonArchivedFarms = farmsConfig.filter(({ pid }) => !isArchivedPid(pid));

// Async thunks
export const fetchFarmsPublicDataAsync = createAsyncThunk<
  Farm[],
  // number[],
  { pids: number[]; priceVsBusdMap: Record<string, string>; vaultData: IVault[] }
>('farms/fetchFarmsPublicDataAsync', async ({ pids, priceVsBusdMap, vaultData }) => {
  const farmsToFetch = farmsConfig.filter((farmConfig) => pids.includes(farmConfig.pid));

  // Add price helper farms
  const farmsWithPriceHelpers = farmsToFetch.concat([]);

  const farms = await fetchFarms(farmsWithPriceHelpers, priceVsBusdMap, vaultData);
  const farmsWithPrices = await fetchFarmsPrices(farms, priceVsBusdMap);
  // Filter out price helper LP config farms

  const farmsWithoutHelperLps = farmsWithPrices.filter((farm: Farm) => {
    return farm.pid || farm.pid === 0;
  });
  return farmsWithoutHelperLps;
});

interface FarmUserDataResponse {
  pid: number;
  allowance: string;
  tokenBalance: string;
  stakedBalance: string;
  earnings: string;
}

export const fetchFarmUserDataAsync = createAsyncThunk<FarmUserDataResponse[], { account: string; pids: number[] }>(
  'farms/fetchFarmUserDataAsync',
  async ({ account, pids }) => {
    const farmsToFetch = farmsConfig.filter((farmConfig) => pids.includes(farmConfig.pid));
    const userFarmAllowances = await fetchFarmUserAllowances(account, farmsToFetch);
    const userFarmTokenBalances = await fetchFarmUserTokenBalances(account, farmsToFetch);
    const userStakedBalances = await fetchFarmUserStakedBalances(account, farmsToFetch);
    const userFarmEarnings = await fetchFarmUserEarnings(account, farmsToFetch);

    return userFarmAllowances.map((farmAllowance, index) => {
      return {
        pid: farmsToFetch[index].pid,
        allowance: userFarmAllowances[index],
        tokenBalance: userFarmTokenBalances[index],
        stakedBalance: userStakedBalances[index],
        earnings: userFarmEarnings[index],
      };
    });
  },
);

export const farmsSlice = createSlice({
  name: 'Farms',
  initialState,
  reducers: {
    setLoadArchivedFarmsData: (state, action) => {
      const loadArchivedFarmsData = action.payload;
      state.loadArchivedFarmsData = loadArchivedFarmsData;
    },
  },
  extraReducers: (builder) => {
    // Update farms with live data
    builder.addCase(fetchFarmsPublicDataAsync.fulfilled, (state, action) => {
      state.data = state.data.map((farm) => {
        const liveFarmData = action.payload.find((farmData) => farmData.pid === farm.pid);

        return { ...farm, ...liveFarmData };
      });
      let _total = BIG_ZERO;
      for (let i = 0; i < state.data.length; i++) {
        const farm = state.data[i];
        if (farm.liquidity && Number(farm.liquidity) !== 0) {
          _total = _total.plus(new BigNumber(farm.liquidity));
        }
      }
      if (_total.toNumber() !== 0) {
        state.allLiquidity = _total.toFixed(8);
      }
      // state.data = arr;
    });

    // Update farms with user data
    builder.addCase(fetchFarmUserDataAsync.fulfilled, (state, action) => {
      action.payload.forEach((userDataEl) => {
        const { pid } = userDataEl;
        const index = state.data.findIndex((farm) => farm.pid === pid);
        state.data[index] = { ...state.data[index], userData: userDataEl };
      });
      state.userDataLoaded = true;
    });
  },
});

// Actions
export const { setLoadArchivedFarmsData } = farmsSlice.actions;

export default farmsSlice.reducer;
