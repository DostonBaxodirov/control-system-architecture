import { STATUS } from './constants';
import * as Types from './types';

const getStatus = (status: STATUS): Types.Plan['status'] => {
  switch (status) {
    case 'CREATED': {
      return { label: 'Yaratilgan', value: status, variant: 'blue' };
    }
    case 'IN_PROGRESS': {
      return { label: 'Jarayonda', value: status, variant: 'yellow' };
    }
    default: {
      return { label: 'Tugallangan', value: status, variant: 'green' };
    }
  }
};

export const Plan = (item: any): Types.Plan => ({
  ...item,
  status: getStatus(item.status)
});
