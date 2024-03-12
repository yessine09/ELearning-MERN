import React, { useState, useRef, useEffect, useContext } from 'react';
import { useFormik } from 'formik';
import CustomCodeInput from './CustomCodeInput';
import { ContentContainer, CustomBtn } from '../Login';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { ContactContext } from './context/InputTypeContext';
import { ContactValueContext } from './context/ContactValueContext';
import { useMutation } from 'react-query';
import { VerifyCodeArgs, fetchResetPasswordByEmail, fetchResetPasswordByFn } from '../../../../api/user';
import { toast } from 'react-toastify';

interface FormValues {
    digit1: string;
    digit2: string;
    digit3: string;
    digit4: string;
    digit5: string;
    digit6: string;
}

const VerificationCode: React.FC = () => {
    const { isPhoneNumber } = useContext(ContactContext);
    // const { mutate } = useMutation(isPhoneNumber ? fetchResetPasswordByFn : fetchResetPasswordByEmail)
    const { mutate } = useMutation(VerifyCodeArgs, {
        onSuccess: (data) => {
            if (data.status === "code_not_verified") {
                toast.error(data.msg, {
                    position: "top-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "light",
                });
                return;

            } toast.info(data.msg, {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
            });
            navigate('/auth/resetpassword')

        },
        onError: (error) => {
            console.error(error);
            toast.error("Failed to send verification code user.", {
                position: "top-right",
                theme: "colored",
                style: { backgroundColor: "#D40776", color: "white" },
            });
        },
    });
    const [verificationCode, setVerificationCode] = useState<string>('');
    const [loading, setLoading] = useState(false)
    const navigate = useNavigate();
    const contacte = isPhoneNumber ? "Phone Number" : "Email";
    const { contact } = useContext(ContactValueContext)
    const formik = useFormik<FormValues>({
        initialValues: {
            digit1: '',
            digit2: '',
            digit3: '',
            digit4: '',
            digit5: '',
            digit6: '',
        },
        onSubmit: (values) => {
            const isFormFilled = Object.values(formik.values).every((value) => value !== '');
            if (isFormFilled) {
                const code = `${formik.values.digit1}${formik.values.digit2}${formik.values.digit3}${formik.values.digit4}${formik.values.digit5}${formik.values.digit6}`;
                setVerificationCode(code);
                console.log(code);
                mutate({ code: code });

            }

        },
    });

    const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

    const moveToNext = (currentField: keyof FormValues) => {
        const fieldIndex = Object.keys(formik.values).findIndex(key => key === currentField);
        if (fieldIndex !== -1) {
            const nextField = Object.keys(formik.values)[fieldIndex + 1] as keyof FormValues;
            const nextFieldElement = document.getElementById(nextField) as HTMLInputElement;
            if (nextFieldElement) {
                nextFieldElement.focus();
            }
        }
    };

    const handleSend = async () => {
        console.log(contact)
        console.log(isPhoneNumber)
        if (isPhoneNumber) {
            fetchResetPasswordByFn({ contact });
        }
        fetchResetPasswordByEmail({ contact });
    };



    return (
        <div>
            <ContentContainer />
            <div className="login-form-wrapper" style={{ backgroundColor: 'white' }}>
                <div className="login-form-content">
                    <h1 className="sign-in-header">Verify Your {contacte}</h1>
                    <div className="flex flex-col items-center" >
                        <p className="text-darkBlue font-font text-[20px]"  >
                            Please Enter The Code Sent to
                        </p>
                        <p className="text-darkBlue font-font text-[17px] mt-2" >
                            {contact}
                        </p>

                    </div>
                    <form onSubmit={formik.handleSubmit} className='flex flex-col justify-between items-center w-full mt-[10%]'>
                        <div className='flex justify-between w-[70%]'>
                            <CustomCodeInput
                                id='digit1'
                                name='digit1'
                                maxLength={1}
                                value={formik.values.digit1}
                                onChange={formik.handleChange}
                                onKeyUp={() => moveToNext('digit1')}
                                ref={(el) => (inputRefs.current[0] = el)}
                            />

                            <CustomCodeInput
                                id='digit2'
                                name='digit2'
                                maxLength={1}
                                value={formik.values.digit2}
                                onChange={formik.handleChange}
                                onKeyUp={() => moveToNext('digit2')}
                                ref={(el) => inputRefs.current[2] = el}
                            />
                            <CustomCodeInput
                                id='digit3'
                                name='digit3'
                                maxLength={1}
                                value={formik.values.digit3}
                                onChange={formik.handleChange}
                                onKeyUp={() => moveToNext('digit3')}
                                ref={(el) => inputRefs.current[3] = el}
                            />
                            <CustomCodeInput
                                id='digit4'
                                name='digit4'
                                maxLength={1}
                                value={formik.values.digit4}
                                onChange={formik.handleChange}
                                onKeyUp={() => moveToNext('digit4')}
                                ref={(el) => inputRefs.current[4] = el}
                            />
                            <CustomCodeInput
                                id='digit5'
                                name='digit5'
                                maxLength={1}
                                value={formik.values.digit5}
                                onChange={formik.handleChange}
                                onKeyUp={() => moveToNext('digit5')}
                                ref={(el) => inputRefs.current[5] = el}
                            />
                            <CustomCodeInput
                                id='digit6'
                                name='digit6'
                                maxLength={1}
                                value={formik.values.digit6}
                                onChange={formik.handleChange}
                                onKeyUp={() => moveToNext('digit6')}
                                ref={(el) => inputRefs.current[6] = el}
                            />
                        </div>
                        <p className="mt-[22px] mb-[45px]">
                            Didn't receive any Code?{' '}
                            <button type='submit' onClick={handleSend}>
                                <span className="btn-link2 ">
                                    Resend
                                </span>
                            </button>
                        </p>
                        <div className=' flex items-center'>
                            <button
                                type='submit'
                                className='saveBtn h-[40px] w-[140px] ml-2'
                            // disabled={formik.isSubmitting}

                            >
                                {!loading && <span className='indicator-label'>Verify</span>}
                                {loading && (
                                    <span className='indicator-progress' style={{ display: 'block' }}>
                                        Please wait...
                                        <span className='spinner-border spinner-border-sm align-middle ms-2'></span>
                                    </span>
                                )}
                            </button>
                        </div>
                        <p className="mt-[25px]">
                            Not a Shaper Yet?{' '}
                            <Link to='/auth/register'>
                                <span className="btn-link2 ">
                                    Create Your Account
                                </span>
                            </Link>
                        </p>

                    </form>

                </div>
            </div>
        </div>
    )
}
export default VerificationCode;
