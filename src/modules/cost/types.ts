export interface Cost {
  id: string;
  createdAt: string;
  name: string;
  planId: string;
  projectId: string;
  amount: number;
  currency: string;
  reason: string;
  type: string;
}
