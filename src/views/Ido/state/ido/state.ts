import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { getTimeStamp } from 'utils';
import { idoEndDate, idoStartTime } from 'views/Ido/constants/constants';
import { IFetchIdoCallback, IIdoState, IIdoStateEnum } from './types';
import { fetchIdo } from './fetchIdo';
const initialState: IIdoState = {
  idoState: IIdoStateEnum.PROCING,
  startTime: 1684425599, //2023-05-18 23:59:59
  endTime: 1684425599, //2023-05-18 23:59:59
  mainTokenPrice: '0',
  idoInAstrBalance: '0',
  avatInIdoBalance: '0',
  avatEstimatedPrice: '0.00',
  apr: '261.22',
  amountInPool: '247138.91',
  rewards: '2137.92',
  lpTotalBalance: '5862.12',
  lpBalance: {},
  maxASTRBalance: {},
  isUserLoaded: false,
};

export const fetchIdoAsync = createAsyncThunk<IFetchIdoCallback, null>('ido/fetchIdoAsync', async () => {
  const { avatInIdoBalance } = await fetchIdo();
  return {
    avatInIdoBalance,
  };
});
// 31536000
// const nowTimestamp = Number((new Date().valueOf() / 1000).toFixed(0));
// const nextTimes = Number(endTime) - nowTimestamp;
// console.log({ nextTimes });
export const idoSlice = createSlice({
  name: 'ido',
  initialState,
  reducers: {
    updateStartTime: (state) => {
      const startDate = idoStartTime;
      const startTime = Number((new Date(startDate).valueOf() / 1000).toFixed(0));
      const nowTimestamp = getTimeStamp();
      const nextTimes = startTime - nowTimestamp;
      state.startTime = nextTimes;
    },
    updateEndTime: (state) => {
      const endDate = idoEndDate;
      const endTime = Number((new Date(endDate).valueOf() / 1000).toFixed(0));
      const nowTimestamp = getTimeStamp();
      const nextTimes = endTime - nowTimestamp;
      state.endTime = nextTimes;
    },
    updateBalance: (state, action) => {
      state.idoInAstrBalance = action.payload.idoInAstrBalance;
    },
    updateState: (state, action) => {
      for (const key in action.payload) {
        state[key] = action.payload[key];
      }
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchIdoAsync.fulfilled, (state, action) => {
      for (const key in action.payload) {
        state[key] = action.payload[key];
      }
    });
  },
});
export const { updateEndTime, updateStartTime, updateBalance, updateState } = idoSlice.actions;
export default idoSlice.reducer;
