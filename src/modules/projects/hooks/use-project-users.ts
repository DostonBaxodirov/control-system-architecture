import { useQuery } from '@tanstack/react-query';

import { http } from '~/services';

import * as Types from '../types';

type TQuery = {
  projectUsers: Types.ProjectUser[];
};

const useProjectUsers = (id: string) => {
  const initialData: TQuery = { projectUsers: [] };

  const { data = initialData, ...args } = useQuery<unknown, string, TQuery>({
    queryKey: ['PROJECT-USERS', id],
    queryFn: async () => {
      const { data } = await http.get<Types.ProjectUser[]>(`/project-users/${id}`);

      return { projectUsers: data || [] };
    },
    staleTime: 900000
  });

  return { ...data, ...args };
};

export default useProjectUsers;
