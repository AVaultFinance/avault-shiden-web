import { createSlice } from '@reduxjs/toolkit';
import { GovernanceState } from './types';

const initialState: GovernanceState = {
  rewards: [],
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
  reducers: {},
});
export default governanceSlice.reducer;
