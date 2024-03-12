import * as Yup from 'yup'

const ExperienceSchema = Yup.object().shape({
    jobTitle: Yup.string()
        .min(3, 'Minimum 3 symbols')
        .max(50, 'Maximum 50 symbols')
        .required('Job Title is required'),
    local: Yup.string()
        .min(3, 'Minimum 3 symbols')
        .max(50, 'Maximum 50 symbols')
        .required('Local is required'),
    company: Yup.string()
        .min(3, 'Minimum 3 symbols')
        .max(50, 'Maximum 50 symbols')
        .required('Company is required'),
    period: Yup.string()
        .min(3, 'Minimum 3 symbols')
        .max(50, 'Maximum 50 symbols')
        .required('Period is required'),

})
export default ExperienceSchema;