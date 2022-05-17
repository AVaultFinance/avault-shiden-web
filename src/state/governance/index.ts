import { createSlice } from '@reduxjs/toolkit';
import { GovernanceState, ILockAVATModalState } from './types';

const initialState: GovernanceState = {
  rewards: [],
  // 0: init;
  // 1: add amount
  // 2 change lock time
  lockAVATModalState: ILockAVATModalState.INIT,
  hasLocked: false, //
  apy: '682.11',
  tvlTotal: '0',
  avarageLockTime: '48.11',
  totalAVATLocked: '88728.11',
  userData: {},
  isUserLoaded: false,
};
export const governanceSlice = createSlice({
  name: 'governance',
  initialState,
  reducers: {
    changeLockAVATModalState: (state, action) => {
      console.log('action.payload.lockAVATModalState: ', action.payload.lockAVATModalState);

      state.lockAVATModalState = action.payload.lockAVATModalState as ILockAVATModalState;
      console.log('state.lockAVATModalState: ', state.lockAVATModalState);
    },
  },
});
export const { changeLockAVATModalState } = governanceSlice.actions;
export default governanceSlice.reducer;
