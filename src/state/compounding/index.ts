import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { CompoundingState } from 'state/types';
import compoundingsConfig from 'config/constants/compounding';
import fetchCompoundings from './fetchCompoundings';
import { ICompounding, ICompoundingUserData } from './types';
import {
  fetchCompoundingsFarmEarnings,
  fetchCompoundingsFarmStakedBalances,
  fetchCompoundingsFarmUserAllowances,
  fetchCompoundingsFarmUserTokenBalances,
  fetchCompoundingsUsers,
} from './fetchCompoundingUser';
const initialState: CompoundingState = {
  data: [],
  allLiquidity: '',
  userDataLoaded: false,
};
export const fetchCompoundingsPublicDataAsync = createAsyncThunk<
  [ICompounding[], string],
  { priceVsBusdMap: Record<string, string> }
>('compounding/fetchCompoundingsPublicDataAsync', async ({ priceVsBusdMap }) => {
  const compoundings = await fetchCompoundings(compoundingsConfig, priceVsBusdMap);
  return compoundings;
});
export const fetchCompoundingFarmUserDataAsync = createAsyncThunk<
  ICompoundingUserData[],
  {
    account: string;
    compoundings: ICompounding[];
  }
>('compounding/fetchCompoundingFarmUserDataAsync', async ({ account, compoundings }) => {
  const userCompoundingsFarmAllowances = await fetchCompoundingsFarmUserAllowances(account, compoundings);
  const userCompoundingsFarmTokenBalances = await fetchCompoundingsFarmUserTokenBalances(account, compoundings);
  const userCompoundingsStakedBalances = await fetchCompoundingsFarmStakedBalances(account, compoundings);
  const userCompoundingEarnings = await fetchCompoundingsFarmEarnings(account, compoundings);
  const userCompoundingUsers = await fetchCompoundingsUsers(account, compoundings);
  console.log(userCompoundingsStakedBalances);
  return userCompoundingsFarmAllowances.map((farmAllowance, index) => {
    return {
      pid: compoundings[index].farm.pid,
      allowance: userCompoundingsFarmAllowances[index],
      stakingTokenBalance: userCompoundingsFarmTokenBalances[index],
      stakedBalance: userCompoundingsStakedBalances[index],
      pendingReward: userCompoundingEarnings[index],
      avaultAddressBalance: userCompoundingUsers[index],
    };
  });
});
export const compoundingSlice = createSlice({
  name: 'Compounding',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchCompoundingsPublicDataAsync.pending, (state, action) => {
      state.userDataLoaded = false;
    });
    builder.addCase(fetchCompoundingsPublicDataAsync.fulfilled, (state, action) => {
      state.userDataLoaded = true;
      state.data = action.payload[0];
      state.allLiquidity = action.payload[1];
    });
    builder.addCase(fetchCompoundingFarmUserDataAsync.fulfilled, (state, action) => {
      action.payload.forEach((userDataEl) => {
        const { pid } = userDataEl;
        const index = state.data.findIndex((compounding: ICompounding) => compounding.farm.pid === pid);
        state.data[index] = {
          ...state.data[index],
          compounding: {
            ...state.data[index].compounding,
          },
          farm: {
            ...state.data[index].farm,
            userData: userDataEl,
          },
        };
      });
      state.userDataLoaded = true;
    });
  },
});
export default compoundingSlice.reducer;
