import * as Yup from 'yup';

const registrationSchema = Yup.object().shape({
    firstName: Yup.string()
        .min(3, 'Minimum 3 symbols')
        .max(50, 'Maximum 50 symbols')
        .required('First name is required'),
    email: Yup.string()
        .email('Wrong email format')
        .min(3, 'Minimum 3 symbols')
        .max(50, 'Maximum 50 symbols')
        .required('Email is required'),
    lastName: Yup.string()
        .min(3, 'Minimum 3 symbols')
        .max(50, 'Maximum 50 symbols')
        .required('Last name is required'),
    password: Yup.string()
        .min(8, 'Password must be at least 8 characters')
        .max(50, 'Password must be at most 50 characters')
        .matches(
            /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?\d)(?=.*?[@$!%*?&])[A-Za-z\d@$!%*/?&]{8,}$/,
            'Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character'
        )
        .required('Password is required'),
    verifyPassword: Yup.string()
        .oneOf([Yup.ref('password')], 'Passwords must match')
        .required('Password verification is required'),
    acceptTerms: Yup.boolean().oneOf([true], 'Please accept the terms and conditions'),
});

export default registrationSchema;
