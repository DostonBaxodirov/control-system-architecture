import { TagProps } from '~/components/tag/tag';

import { STATUS } from './constants';

type TagColor = TagProps['color'];
export interface Plan {
  id: string;
  name: string;
  createAt: string;
  projectId: string;
  userId: string;
  duration: number;
  countOfSubPlan: number;
  totalAmount: number;
  currency: string;
  status: { label: string; value: STATUS; variant: TagColor };
}
