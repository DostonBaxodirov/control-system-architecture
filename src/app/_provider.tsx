'use client';

import { ReactNode } from 'react';
import { Provider as ReduxProvider } from 'react-redux';
import { QueryCache, QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { PersistGate } from 'redux-persist/integration/react';

import { persist, store } from '~/store';
import { onError } from '~/utils/error';

const client = new QueryClient({
  defaultOptions: { queries: { refetchOnWindowFocus: false, retry: false }, mutations: { retry: false, onError } },
  queryCache: new QueryCache({ onError })
});

const Provider = ({ children }: { children: ReactNode }) => (
  <ReduxProvider store={store}>
    <PersistGate persistor={persist}>
      <QueryClientProvider client={client}>
        {/* <ReactQueryDevtools initialIsOpen={false} /> */}
        {children}
      </QueryClientProvider>
    </PersistGate>
  </ReduxProvider>
);

export default Provider;
