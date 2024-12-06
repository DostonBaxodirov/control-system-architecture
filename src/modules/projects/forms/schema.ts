import * as yup from 'yup'

export const createProjectSchema = yup.object().shape({
    name:yup.string().required("Loyixa nomini kiriting"),
    type: yup.string().required("Loyixa turini tanlang"),
    location: yup.string(),
    startDate: yup.string(),
    currencyId: yup.string().required("Pul birligini tanlang.")
})

export const inviteUserSchema = yup.object().shape({
    userId: yup.string().required("Userni tanlang.")
})