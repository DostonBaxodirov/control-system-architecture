import { useQuery } from '@tanstack/react-query';

import { http } from '~/services';

import { Role } from '../types';

type TQuery = {
  roles: Role[];
};
const useRole = () => {
  const initialData: TQuery = { roles: [] };

  const { data = initialData, ...args } = useQuery<unknown, string, TQuery>({
    queryKey: ['ROLES'],
    queryFn: async () => {
      const { data } = await http.get('/role');

      return { roles: data };
    },
    staleTime: 900000,
    retry: false
  });

  return { ...data, ...args };
};

export default useRole;
