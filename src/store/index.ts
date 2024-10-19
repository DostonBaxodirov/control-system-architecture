import { TypedUseSelectorHook, useDispatch as useBaseDispatch, useSelector as useBaseSelector } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import { persistReducer } from 'redux-persist';
import persistStore from 'redux-persist/es/persistStore';
import storage from 'redux-persist/lib/storage';

import rootReducer from './reducer';
import * as Types from './types';

const persistConfig: any = {
  key: 'persist-store',
  storage,
  whiteList: []
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export type IStore = ReturnType<typeof store.getState>;
export type IDispatch = typeof store.dispatch;

const useDispatch = () => useBaseDispatch<IDispatch>();
const useSelector: TypedUseSelectorHook<Types.IState> = useBaseSelector;
const store = configureStore({
  reducer: persistedReducer,
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: false,
      immutableCheck: false
    })
});

const persist = persistStore(store);

export { persist, store, useDispatch, useSelector };
export * from './reducer';
