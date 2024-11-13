
import * as yup from 'yup'

export const addEditCurrencySchema = yup.object().shape({
    name:yup.string().required("Valuta nomini kiriting"),
    amount: yup.number().required("So'mdagi qiymatni kiriting")
})
