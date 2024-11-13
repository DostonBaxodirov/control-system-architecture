import * as yup from 'yup';

export const createCostSchema = yup.object().shape({
  name: yup.string().required('Nomini kiriting.'),
  planId: yup.string().required('Planni tanlang.'),
  amount: yup.number().required('Qiymatini kiriting.'),
  currencyId: yup.string().required('Pul birligini tanlang'),
  reason: yup.string().required('Sababni kiriting.'),
  type: yup.string().required('Turini tanlang.')
});
