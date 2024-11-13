import { STATUS } from '../plans/constants';

import * as Types from './types';

export const SubPlan = (item: any): Types.SubPlan => {
  const getStatus = (status: STATUS): Types.SubPlan['status'] => {
    switch (status) {
      case 'CREATED': {
        return { label: 'Yaratilgan', value: status, variant: 'blue' };
      }
      case 'IN_PROGRESS': {
        return { label: 'Jarayonda', value: status, variant: 'gold' };
      }
      default: {
        return { label: 'Tugallangan', value: status, variant: 'green' };
      }
    }
  };

  return {
    ...item,
    status: getStatus(item.status)
  };
};
