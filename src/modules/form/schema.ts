import * as yup from 'yup'

export const authSchema = yup.object().shape({
    phone:yup.string().required('Phone number is required field'),
    password: yup.string().required('Password is required field')
})