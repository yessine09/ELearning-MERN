import * as Yup from "yup";
const HardSkillSchema = Yup.object().shape({
    skill: Yup.string()
        .min(3, 'Minimum 3 symbols')
        .max(50, 'Maximum 50 symbols')
        .required('Field is required')
        .matches(/^[a-zA-Z0-9]+$/, 'Only alphanumeric characters are allowed'),
    level: Yup.string().required('Level is required'),
})
export default HardSkillSchema;