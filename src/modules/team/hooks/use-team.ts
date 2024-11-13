import { useQuery } from '@tanstack/react-query';

import { http } from '~/services/config';

import { User } from '../types';

type Query = {
  users: User[];
};

const useTeam = () => {
  const initialData: Query = { users: [] };

  const { data = initialData, ...args } = useQuery({
    queryKey: ['USERS'],
    queryFn: async () => {
      const { data } = await http.get<User[]>('/user');

      return { users: data };
    },
    staleTime: 1200000,
    retry:false
  });

  return { ...data, ...args };
};

export default useTeam;
