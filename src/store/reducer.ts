import { combineReducers, Reducer } from '@reduxjs/toolkit';

import auth from '~/modules/auth/slice';

import * as Types from './types';

// @ts-ignore
const rootReducer: Reducer<Types.IState> = combineReducers<Types.IState>({ auth });

export default rootReducer;
export * from '~/modules/auth/slice'
