import React from 'react';
import { DefaultError, QueryKey, useQuery as useBaseUseQuery, UseQueryOptions as BaseUseQueryOptions, UseQueryResult } from '@tanstack/react-query';

interface UseQueryOptions<TQueryFnData, TError, TData, TQueryKey extends QueryKey = QueryKey> extends BaseUseQueryOptions<TQueryFnData, TError, TData, TQueryKey> {
  onError?: (error: TError) => void;
  onSuccess?: (data: TData) => void;
}

export const useQuery = <TQueryFnData = unknown, TError = DefaultError, TData = TQueryFnData, TQueryKey extends QueryKey = QueryKey>({
  onError,
  onSuccess,
  ...args
}: UseQueryOptions<TQueryFnData, TError, TData, TQueryKey>): UseQueryResult<TData, TError> => {
  const query: UseQueryResult<TData, TError> = useBaseUseQuery({ ...args } as any);

  React.useEffect(() => {
    if (query.data && onSuccess) onSuccess(query.data);
  }, [query.data]);

  React.useEffect(() => {
    if (query.error && onError) onError(query.error);
  }, [query.error]);

  return query;
};
