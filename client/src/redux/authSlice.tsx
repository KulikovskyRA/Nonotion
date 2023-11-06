import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { IUserData } from '../types/types';

const initialState: IUserData = {
  id: 0,
  name: '',
};

const rtkSlice = createSlice({
  name: 'authSlice',
  initialState,
  reducers: {
    authReducer(state, action: PayloadAction<IUserData>) {
      state.id = action.payload.id;
      state.name = action.payload.name;
    },
  },
});

export default rtkSlice.reducer;
export const {
  authReducer,
  //  checkAuthReducer
} = rtkSlice.actions;
