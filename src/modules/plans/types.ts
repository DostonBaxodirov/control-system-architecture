export interface Plan {
  ID: string;
  Name: string;
  CreateAt: string;
  ProjectID: string;
  UserID: string;
  Type: string;
  Duration: number;
  UnitOfMeasure: string;
  Quantity: number;
  SumOfUnit: number;
  TotalAmount: number;
  Currency: string;
  Status: string;
}
