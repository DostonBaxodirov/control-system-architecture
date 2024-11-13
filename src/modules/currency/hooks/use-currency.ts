import { useQuery } from '@tanstack/react-query';

import { http } from '~/services';

import * as Mappers from '../mapper';
import * as Types from '../types';

type TQuery = {
  currencies: Types.Currency[];
};

const useCurrency = () => {
  const initialData: TQuery = { currencies: [] };

  const { data = initialData, ...args } = useQuery<unknown, any, TQuery>({
    queryKey: ['CURRENCIES'],
    queryFn: async () => {
      const { data } = await http.get<Types.Currency[]>('/currency');

      const currencies = (data || []).map(Mappers.Currency);

      return { currencies };
    },
    staleTime: 6000000,
    retry: false
  });

  return { ...data, ...args };
};

export default useCurrency;
