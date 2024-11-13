import { useDispatch, useSelector } from 'react-redux';

import { getCurrencyId, getIsLoggedIn, getProjectId, getUserId, logout as baseLogout } from '~/store';

interface TReturn {
  userId: string;
  projectId: string;
  currencyId: string;
  isLoggedIn: boolean;
  methods: {
    logout: () => void;
  };
}

export const useAuth = (): TReturn => {
  const dispatch = useDispatch();

  const userId = useSelector(getUserId)!;
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
    methods: {
      logout
    }
  };
};

