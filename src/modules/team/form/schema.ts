import * as yup from 'yup';

export const addUserSchema = yup.object().shape({
  phone: yup.string().required('Telefon raqam kirishit talab etiladi'),
  password: yup.string().required('Parol kirishit talab etiladi'),
  fullName: yup.string().required('Ism va familiyani kiritish talab etiladi'),
  role: yup.string().required('Role tanlang')
});
