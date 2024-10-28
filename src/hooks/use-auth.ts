import { useDispatch, useSelector } from 'react-redux';

import { getProjectId, getUserId, logout as baseLogout } from '~/store';

interface TReturn {
  userId: string;
  projectId: string;
  methods: {
    logout: () => void;
  };
}

const useAuth = (): TReturn => {
  const dispatch = useDispatch();

  const userId = useSelector(getUserId)!;
  const projectId = useSelector(getProjectId)!;

  const logout = () => {
    localStorage.setItem('accessToken', '');
    dispatch(baseLogout());
  };

  return {
    userId,
    projectId,
    methods: {
      logout
    }
  };
};

export default useAuth;
