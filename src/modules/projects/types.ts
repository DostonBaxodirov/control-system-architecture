export interface Project {
  id: string;
  name: string;
  createdAt: string;
  location: string;
  estimatedCost: string;
  startDate: string;
  endDate: string;
  spentCost: string;
  currency: string
  type: string;
  isEnded:boolean
}
