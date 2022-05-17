import { createSlice } from '@reduxjs/toolkit';
import { IIdoState, IIdoStateEnum } from './types';

const initialState: IIdoState = {
  idoState: IIdoStateEnum.PROCING,
  isUserLoaded: false,
  maxASTRBalance: '0',
};

export const idoSlice = createSlice({
  name: 'ido',
  initialState,
  reducers: {},
});
export default idoSlice.reducer;
