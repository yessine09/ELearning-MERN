import * as Yup from 'yup'

const loginSchema = Yup.object().shape({
    email: Yup.string()
        .email('Wrong email format')
        .min(3, 'Minimum 3 symbols')
        .max(50, 'Maximum 50 symbols')
        .required('Email is required'),
    password: Yup.string()
        .min(8, 'Minimum 8 symbols')
        .max(50, 'Maximum 50 symbols')
        .required('Password is required')
    ,
})

export default loginSchema;