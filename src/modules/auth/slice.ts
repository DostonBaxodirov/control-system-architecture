import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import persistReducer from 'redux-persist/es/persistReducer';
import persistStore from 'redux-persist/es/storage';

import { IStore } from '~/store';

import * as Types from './types';

const initialState: Types.IAuth = {
  userId: null,
  projectId: null,
  currencyId: null,
  isLoggedIn: false
};

const slice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    login(auth: Types.IAuth, { payload }: PayloadAction<{ userId: string }>) {
      auth.userId = payload.userId;
      auth.isLoggedIn = true;
    },
    logout(auth: Types.IAuth) {
      auth.userId = '';
      auth.isLoggedIn = false;
    },
    changeProjectId(auth, { payload }: PayloadAction<{ id: string }>) {
      auth.projectId = payload.id;
    },
    changeCurrencyId(auth, { payload }: PayloadAction<{ id: string }>) {
      auth.currencyId = payload.id;
    }
  }
});

export const { login, logout, changeProjectId,changeCurrencyId } = slice.actions;

export const getUserId = (store: IStore) => store.auth.userId;
export const getProjectId = (store: IStore) => store.auth.projectId;
export const getCurrencyId = (store: IStore) => store.auth.currencyId;
export const getIsLoggedIn = (store: IStore) => store.auth.isLoggedIn

const persistConfig = {
  key: 'csa-auth',
  storage: persistStore,
  whitelist: ['userId']
};

export default persistReducer<Types.IAuth>(persistConfig, slice.reducer);
