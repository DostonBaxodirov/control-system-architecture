import { Project } from '../projects/types';
import { User } from '../team/types';

export type IAuth = {
  userId: string | null;
  projectId: string | null;
  currencyId: string | null;
  isLoggedIn: boolean;
  user: User | null;
  currentProject: Project | null;
};
