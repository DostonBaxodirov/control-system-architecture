import * as yup from 'yup'

export const authSchema = yup.object().shape({
    phone:yup.string().required('Telefon raqam kirishit talab etiladi'),
    password: yup.string().required('Parol kirishit talab etiladi')
})