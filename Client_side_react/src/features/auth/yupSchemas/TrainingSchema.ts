import * as Yup from "yup";
const TrainingSchema = Yup.object().shape({
    establishment: Yup.string()
        .min(3, 'Minimum 3 symbols')
        .max(50, 'Maximum 50 symbols')
        .required('Establishment is required'),
    local: Yup.string()
        .min(3, 'Minimum 3 symbols')
        .max(50, 'Maximum 50 symbols')
        .required('Local is required'),
    specilization: Yup.string()
        .min(3, 'Minimum 3 symbols')
        .max(50, 'Maximum 50 symbols')
        .required('Company is required'),
    level: Yup.string()
        .min(3, 'Minimum 3 symbols')
        .max(50, 'Maximum 50 symbols')
        .required('Period is required'),
    startDate: Yup.date()
        .required('Start date is required'),
    endDate: Yup.date()
        .required('End date is required'),


})

export default TrainingSchema;