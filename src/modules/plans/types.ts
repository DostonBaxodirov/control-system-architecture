export interface Plan {
  id: string;
  name: string;
  createAt: string;
  projectID: string;
  userId: string;
  type: string;
  duration: number;
  unitOfMeasure: string;
  quantity: number;
  sumOfUnit: number;
  totalAmount: number;
  currency: string;
  status: string;
}
