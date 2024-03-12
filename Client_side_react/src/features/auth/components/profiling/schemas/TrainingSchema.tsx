import * as Yup from "yup"
export const TrainingSchema = Yup.object().shape({
    establishment: Yup.string()
        .min(3, 'Minimum 3 symbols')
        .max(50, 'Maximum 50 symbols')
        .required('Job Title is required'),
    local: Yup.string()
        .min(3, 'Minimum 3 symbols')
        .max(50, 'Maximum 50 symbols')
        .required('Local is required'),
    specialty: Yup.string()
        .min(3, 'Minimum 3 symbols')
        .max(50, 'Maximum 50 symbols')
        .required('Company is required'),
    degree: Yup.string()
        .min(3, 'Minimum 3 symbols')
        .max(50, 'Maximum 50 symbols')
        .required('Period is required'),
    startDate: Yup.date()
        .required('Start date is required'),
    endDate: Yup.date()
        .required('End date is required'),


})

