import { Link, useNavigate, } from "react-router-dom";
import { useFormik } from "formik";
import { ContentContainer, CustomBtn, CustomErrors, CustomInput, } from "../Login";
import { toAbsoluteUrl } from "../../../../helpers/AssetHelpers";
import { useState } from "react";
import { useMutation } from "react-query";
import { fetchResetPasswordByCode } from "../../../../api/user";
import { toast } from "react-toastify";

import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";
import resetPasswordSchema from "../../yupSchemas/ResetPasswordSchema";

const initialValues = {
    password: '',
    verifyPassword: '',
    email: '',
}
export default function ResetPassword() {
    const [showPassword, setShowPassword] = useState(false);
    const [loading, setLoading] = useState(false)
    const navigate = useNavigate();
    const { mutate } = useMutation(fetchResetPasswordByCode, {
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
            navigate('/auth/login')
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
        validationSchema: resetPasswordSchema,

        onSubmit: ({ password, email }) => {
            mutate({ password: password, email: email })
        },
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
                    <h1 className="text-[40px] font-font font-bold">Create New Password</h1>
                    <div className="">
                        <p className="text-darkBlue font-normal">
                            It must Be different from previous used password
                        </p>
                    </div>

                    <form
                        className='form-container pt-10 justify-between'
                        onSubmit={formik.handleSubmit}
                        noValidate
                    >
                        <CustomInput placeholder="Email" type="string" className='custom-input' {...formik.getFieldProps('email')} />
                        {formik.touched.email && formik.errors.email && (
                            <CustomErrors> {formik.errors.email} </CustomErrors>
                        )}
                        <div className='w-full relative'>
                            <CustomInput placeholder="New Password" type="password" className='custom-input' {...formik.getFieldProps('password')} isPasswordShown={showPassword}
                            />
                            <button
                                type="button"
                                onClick={() => setShowPassword((prev) => !prev)}
                                className="absolute bottom-3 right-2 text-[22px] text-fancyBlue"
                            >
                                {!showPassword ? <AiFillEye /> : <AiFillEyeInvisible />}
                            </button>
                            {formik.touched.password && formik.errors.password && (
                                <CustomErrors> {formik.errors.password} </CustomErrors>
                            )}
                        </div>

                        <div className='w-full relative'>

                            <CustomInput placeholder='Confirm New Passsword' type="password" className='custom-input' {...formik.getFieldProps('verifyPassword')} isPasswordShown={showPassword}
                            />
                            <button
                                type="button"
                                onClick={() => setShowPassword((prev) => !prev)}
                                className="absolute bottom-3 right-2 text-[22px] text-fancyBlue"

                            >
                                {!showPassword ? <AiFillEye /> : <AiFillEyeInvisible />}
                            </button>
                            {formik.touched.verifyPassword && formik.errors.verifyPassword && (
                                <CustomErrors> {formik.errors.verifyPassword} </CustomErrors>
                            )}
                        </div>
                        <div className="w-full pt-[8px] flex flex-col  ">
                            <div className='text-center flex items-center'>
                                <CustomBtn
                                    type='submit'
                                // disabled={formik.isSubmitting || !formik.isValid}
                                >
                                    {!loading && <span>Submit</span>}
                                    {loading && (
                                        <span >
                                            Please wait...
                                        </span>
                                    )}
                                </CustomBtn>
                            </div>
                            <p className="mt-[20px] w-full mb-[30px]  text-center text-[#05445E]">
                                Already have an account ?{"  "}
                                <Link to='/auth/login'>
                                    <span className="btn-link2 ">
                                        Sign In
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
