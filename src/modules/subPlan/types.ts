import { TagProps } from '~/components/tag/tag';

import { STATUS } from '../plans/constants';

export interface SubPlan {
  id: string;
  name: string;
  createAt: string;
  planId: string;
  unitOfMeasure: string;
  quantity: number;
  sumOfUnit: number;
  duration: number;
  totalAmount: number;
  currency: string;
  status: { label: string; value: STATUS; variant: TagProps['color'] };
  type: string;
}
