import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import persistReducer from 'redux-persist/es/persistReducer';
import persistStore from 'redux-persist/es/storage';

import { IStore } from '~/store';

import { Project } from '../projects/types';
import { User } from '../team/types';

import * as Types from './types';

const initialState: Types.IAuth = {
  userId: null,
  projectId: null,
  currencyId: null,
  isLoggedIn: false,
  user: null,
  currentProject: null
};

const slice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    login(auth: Types.IAuth, { payload }: PayloadAction<{ userId: string; user: User }>) {
      auth.userId = payload.userId;
      auth.isLoggedIn = true;
      auth.user = payload.user;
    },
    logout(auth: Types.IAuth) {
      auth.userId = '';
      auth.isLoggedIn = false;
      auth.user = null;
      auth.currencyId = null;
      auth.currentProject = null;
    },
    changeProjectId(auth, { payload }: PayloadAction<{ id: string }>) {
      auth.projectId = payload.id;
    },
    changeCurrencyId(auth, { payload }: PayloadAction<{ id: string }>) {
      auth.currencyId = payload.id;
    },
    changeCurrentProject(auth, { payload }: PayloadAction<{ project: Project }>) {
      auth.currentProject = payload.project;
    }
  }
});

export const { login, logout, changeProjectId, changeCurrencyId, changeCurrentProject } = slice.actions;

export const getUserId = (store: IStore) => store.auth.userId;
export const getUser = (store: IStore) => store.auth.user;
export const getProjectId = (store: IStore) => store.auth.projectId;
export const getCurrencyId = (store: IStore) => store.auth.currencyId;
export const getIsLoggedIn = (store: IStore) => store.auth.isLoggedIn;
export const getCurrentProject = (store: IStore) => store.auth.currentProject;

const persistConfig = {
  key: 'csa-auth',
  storage: persistStore,
  whitelist: ['userId']
};

export default persistReducer<Types.IAuth>(persistConfig, slice.reducer);
