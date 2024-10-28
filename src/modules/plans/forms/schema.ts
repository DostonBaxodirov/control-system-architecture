import * as yup from 'yup';

export const createPlanSchema = yup.object().shape({
  name: yup.string().required('Reja nomini kiriting.'),
  type: yup.string().required('Turni tanlang.'),
  duration: yup.string().required('Davomiylikni belgilang'),
  durationOfUnit: yup.string(),
  unitOfMeasure: yup.string().required("O'lchov birligini kiriting."),
  quantity: yup.number().required('Miqdorni kirting kiriting.'),
  sumOfUnit: yup.number().required('Bir birlik miqdor narxini kirting kiriting.'),
  currency: yup.string().required('Pul birligini tanlang.')
});
