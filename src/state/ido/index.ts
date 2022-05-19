import { createSlice } from '@reduxjs/toolkit';
import { IIdoState, IIdoStateEnum } from './types';

const initialState: IIdoState = {
  idoState: IIdoStateEnum.END,
  endTime: 1684425599, //2023-05-18 23:59:59
  avatEstimatedPrice: '0.00',
  network: '0.00',
  apr: '261.22',
  amountInPool: '247138.91',
  rewards: '2137.92',
  lpTotalBalance: '5862.12',
  lpBalance: {},
  maxASTRBalance: {},

  isUserLoaded: false,
};
// 31536000
// const nowTimestamp = Number((new Date().valueOf() / 1000).toFixed(0));
// const nextTimes = Number(endTime) - nowTimestamp;
// console.log({ nextTimes });
export const idoSlice = createSlice({
  name: 'ido',
  initialState,
  reducers: {
    updateEndTime: (state) => {
      const endDate = '2023-01-18 23:59:59';
      const endTime = Number((new Date(endDate).valueOf() / 1000).toFixed(0));
      const nowTimestamp = Number((new Date().valueOf() / 1000).toFixed(0));
      const nextTimes = endTime - nowTimestamp;
      state.endTime = nextTimes;
    },

    updateIdoState: (state, action) => {
      console.log(action.payload.idoState);
      state.idoState = action.payload.idoState as IIdoStateEnum;
    },
  },
});
export const { updateEndTime, updateIdoState } = idoSlice.actions;
export default idoSlice.reducer;
