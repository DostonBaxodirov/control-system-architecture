import { useDispatch, useSelector } from 'react-redux';

import { User } from '~/modules/team/types';
import { getCurrencyId, getIsLoggedIn, getProjectId, getUser, getUserId, logout as baseLogout } from '~/store';

interface TReturn {
  userId: string;
  projectId: string;
  currencyId: string;
  isLoggedIn: boolean;
  user: User;
  methods: {
    logout: () => void;
  };
}

export const useAuth = (): TReturn => {
  const dispatch = useDispatch();

  const userId = useSelector(getUserId)!;
  const user = useSelector(getUser)!;
  const projectId = useSelector(getProjectId)!;
  const currencyId = useSelector(getCurrencyId)!;
  const isLoggedIn = useSelector(getIsLoggedIn)!;

  const logout = () => {
    localStorage.setItem('accessToken', '');
    dispatch(baseLogout());
  };

  return {
    userId,
    projectId,
    currencyId,
    isLoggedIn,
    user,
    methods: {
      logout
    }
  };
};
