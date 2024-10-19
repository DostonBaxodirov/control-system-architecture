'use client';

import { ReactNode } from 'react';
import { QueryCache, QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';

import { onError } from '~/utils/error';

const client = new QueryClient({
  defaultOptions: { queries: { refetchOnWindowFocus: false, retry: false }, mutations: { retry: false, onError } },
  queryCache: new QueryCache({ onError })
});

const Provider = ({ children }: { children: ReactNode }) => (
  <QueryClientProvider client={client}>
    <ReactQueryDevtools initialIsOpen={false} />
    {children}
  </QueryClientProvider>
);

export default Provider;
