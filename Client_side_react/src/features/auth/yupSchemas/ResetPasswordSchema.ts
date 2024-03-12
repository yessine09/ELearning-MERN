import * as Yup from 'yup';

const resetPasswordSchema = Yup.object().shape({
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
});

export default resetPasswordSchema;
