import { Link, useNavigate, } from "react-router-dom";
import { useFormik } from "formik";
import { ContentContainer, CustomErrors, } from "../Login";
import { toAbsoluteUrl } from "../../../../helpers/AssetHelpers";
import { useContext, useState } from "react";
import { useMutation } from "react-query";
import { fetchResetPasswordByEmail, fetchResetPasswordByFn } from "../../../../api/user";
import { toast } from "react-toastify";
import { ContactContext } from "./context/InputTypeContext";
import ContactValueProvider, { ContactValueContext } from "./context/ContactValueContext";


type MyFormValues = {
    contact: string;
};

function validateContact(value: string): string | undefined {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; // match valid email format
    const phoneRegex = /^[2-9][0-9]{7}$/; // match 8 digit phone number starting with digits 2-9

    if (!value) {
        return 'Email or Phone Number Required';
    } else if (emailRegex.test(value)) {
        return undefined; // valid email, return undefined
    } else if (phoneRegex.test(value)) {
        return undefined; // valid phone number, return undefined
    } else {
        return 'Invalid email or phone number'; // invalid input
    }
}

export default function ForgotPassword() {
    const { setContactValue } = useContext(ContactValueContext)
    const [loading, setLoading] = useState(false)
    const navigate = useNavigate();
    const initialValues: MyFormValues = { contact: '' };
    const { isPhoneNumber, setContact } = useContext(ContactContext);
    const { mutate } = useMutation(isPhoneNumber ? fetchResetPasswordByFn : fetchResetPasswordByEmail, {
        onSuccess: (data) => {
            if (data.status === "user not reset password") {
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
            navigate('/auth/verifycode')
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

    const formik = useFormik({
        initialValues,
        onSubmit: (values, actions) => {
            console.log(values);
            actions.setSubmitting(false);
            const { contact } = values;
            // Check if the contact is a valid phone number
            const phoneRegex = /^[2-9][0-9]{7}$/; // match 8 digit phone number starting with digits 2-9
            const isPhoneNumber = phoneRegex.test(contact);
            setContact(isPhoneNumber);
            // Redirect to reset password page with appropriate parameter
            if (isPhoneNumber) {
                // Navigate to reset password page with phone number parameter
                console.log("phone number", contact)
                setContactValue(contact)
                mutate({ contact: contact });
            } else {
                // Navigate to reset password page with email parameter
                console.log("email", contact)
                setContactValue(contact)
                mutate({ contact: contact });
            }
        },
        validate: (values) => {
            const errors: Partial<MyFormValues> = {};

            const contactError = validateContact(values.contact);
            if (contactError) {
                errors.contact = contactError;
            }

            return errors;
        }
    });


    return (
        <div
            className=' h-screen bg-cover bg-repeat-y'
            style={{
                backgroundImage: `url(${toAbsoluteUrl('/assets/images/bg/background.png')})`,
            }}
        >
            <ContentContainer />
            <div className="login-form-wrapper" style={{ backgroundColor: 'white' }}>
                <div className="login-form-content mt-[130px] ">
                    <h1 className="text-[40px] font-font font-bold">Forget Password</h1>
                    <div className="">
                        <p className="text-darkBlue font-normal">
                            Don't worry , we got you covered
                        </p>
                    </div>

                    <form
                        className='form-container pt-10 justify-between'
                        onSubmit={formik.handleSubmit}
                        noValidate
                    >
                        <div className="input-wrapper">
                            <input
                                className='custom-input'
                                type="text"
                                name="contact"
                                value={formik.values.contact}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                            />
                            {formik.touched.contact && formik.errors.contact && (
                                <CustomErrors>{formik.errors.contact}</CustomErrors>

                            )}
                        </div>
                        <div className="w-full pt-[8px] flex flex-col items-center  ">
                            <div className="mt-[40px] d-flex justify-between">
                                <button
                                    type='submit'
                                    // disabled={formik.isSubmitting || !formik.isValid}
                                    disabled={formik.isSubmitting}
                                    className='saveBtn mr-2 h-[40px] w-[140px]'
                                >
                                    {!loading && <span className='indicator-label'>submit</span>}
                                    {loading && (
                                        <span className='indicator-progress' style={{ display: 'block' }}>
                                            Please wait...
                                            <span className='spinner-border spinner-border-sm align-middle ms-2'></span>
                                        </span>
                                    )}
                                </button>
                                <button
                                    type='submit'
                                    className='cancelBtn h-[40px] w-[140px] ml-2'
                                    onClick={() => navigate('/auth/login')}
                                >

                                    {!loading && <span className='indicator-label'>Cancel</span>}
                                    {loading && (
                                        <span className='indicator-progress' style={{ display: 'block' }}>
                                            Please wait...
                                            <span className='spinner-border spinner-border-sm align-middle ms-2'></span>
                                        </span>
                                    )}

                                </button>
                                {/* end:: Buttons-wrapper*/}

                            </div>
                            <p className="shaper">
                                Not a Shaper Yet?{' '}
                                <Link to='/auth/register'>
                                    <span className="btn-link2 ">
                                        Create Your Account
                                    </span>
                                </Link>
                            </p>
                        </div>
                    </form>

                </div>
            </div>
        </div >
    )
}
