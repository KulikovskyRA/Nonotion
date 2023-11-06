import { combineReducers, configureStore } from '@reduxjs/toolkit';
import authSlice from './authSlice';

const rootReducer = combineReducers({
  authSlice: authSlice,
});

export const store = configureStore({
  reducer: rootReducer,
});

export type RootState = ReturnType<typeof store.getState>;
