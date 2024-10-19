'use client';

import { http } from '~/services';

import { config } from './config';

http.init({
  configFn: async () => {
    const token = localStorage.getItem('accessToken');
    const { baseURL, tokenKEY } = config.backend;

    return { baseURL, headers: { ...(token ? { [tokenKEY || '']: token } : {}) } };
  }
});
