import * as Types from './types';

export const Project = (item: any): Types.Project => ({
  id: item.ID,
  name: item.Name,
  createdAt: item.CreatedAt.Time,
  location: item.Location.String,
  estimatedCost: item.EstimatedCost,
  startDate: item.StartDate.Time,
  endDate: item.EndDate.Time,
  spentCost: item.SpentCost.Int32,
  type: item.Type
});
