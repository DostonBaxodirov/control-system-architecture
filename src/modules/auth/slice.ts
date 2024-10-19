import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import persistReducer from 'redux-persist/es/persistReducer';
import persistStore from 'redux-persist/es/storage';

import { IStore } from '~/store';

import * as Types from './types';

const initialState: Types.IAuth = {
  userId: null
};

const slice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    login(auth: Types.IAuth, { payload }: PayloadAction<Types.IAuth>) {
      auth.userId = payload.userId;
    }
  }
});

export const { login } = slice.actions;

export const getUserId = (store: IStore) => store.auth.userId;

const persistConfig = {
  key: 'auth-storage',
  storage: persistStore,
  whitelist: ['userId']
};

export default persistReducer<Types.IAuth>(persistConfig, slice.reducer);
