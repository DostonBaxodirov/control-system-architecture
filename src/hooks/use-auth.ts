import { useDispatch, useSelector } from 'react-redux';

import { Project } from '~/modules/projects/types';
import { User } from '~/modules/team/types';
import { getCurrencyId, getCurrentProject, getIsLoggedIn, getProjectId, getUser, getUserId, logout as baseLogout } from '~/store';

interface TReturn {
  userId: string;
  projectId: string;
  currencyId: string;
  currentProject: Project;
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
  const currentProject = useSelector(getCurrentProject)!;
  const currencyId = useSelector(getCurrencyId)!;
  const isLoggedIn = useSelector(getIsLoggedIn)!;

  const logout = () => {
    localStorage.setItem('accessToken', '');
    dispatch(baseLogout());
  };

  return {
    userId,
    projectId,
    currentProject,
    currencyId,
    isLoggedIn,
    user,
    methods: {
      logout
    }
  };
};
