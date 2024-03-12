// job application schema using yup 
//
import * as yup from 'yup'

const jobApplicationSchema = yup.object().shape({
    firstName: yup.string().required('First name is required'),
    lastName: yup.string().required('Last name is required'),
    email: yup.string().email('Invalid email').required('Email is required'),
    phone: yup.string().required('Phone number is required'),
    address: yup.string().required('Address is required'),
    resume: yup.string().required(),
    coverLetter: yup.string().required(),
    jobOfferId: yup.string().required('Job offer is required'),
    applicantId: yup.string().required('Applicant is required'),
    status: yup.string().required('Status is required'),
})

export default jobApplicationSchema

