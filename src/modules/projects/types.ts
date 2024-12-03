export interface Project {
  id: string;
  name: string;
  createdAt: string;
  location: string;
  estimatedCost: number;
  startDate: string;
  endDate: string;
  spentCost: number;
  currency: string;
  type: string;
  isEnded: boolean;
}

export type ProjectUser = {
  id: string;
  fullName: string;
};
