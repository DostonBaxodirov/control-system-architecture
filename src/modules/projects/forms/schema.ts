import * as yup from 'yup'

export const createProjectSchema = yup.object().shape({
    name:yup.string().required("Loyixa nomini kiriting"),
    type: yup.string().required("Loyixa turini tanlang"),
    location: yup.string(),
    startDate: yup.string()
})
