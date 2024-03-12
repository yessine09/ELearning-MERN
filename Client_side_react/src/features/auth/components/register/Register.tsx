import { useFormik } from 'formik'
import { useState } from 'react'
import { AiFillEye, AiFillEyeInvisible } from 'react-icons/ai'
import { useMutation } from 'react-query'
import { Link, useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { register } from '../../../../api/user'
import { registrationSchema } from '../../yupSchemas'
import { CustomBtn, CustomErrors, CustomInput, GoogleBtn, LinkedinBtn } from '../Login'
import VerticalStepper from './SignUpVerticalStepper'
import { useAuth } from '../../../../contexts/Auth'
const initialValues = {
  firstName: '',
  lastName: '',
  email: '',
  password: '',
  verifyPassword: '',
  acceptTerms: false,
  role: 'client',
}

export function Registration() {
  const [showPassword, setShowPassword] = useState(false)
  const [loading, setLoading] = useState(false)
  const { handleRegister } = useAuth()
  const navigate = useNavigate()
  const { mutate } = useMutation(register, {
    onSuccess: (response) => {
      if (response.status === 'user not created') {
        toast.error(response.msg, {
          position: 'top-right',
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: 'light',
        })
        return
      }
      toast.info(response.status, {
        position: 'top-right',
        autoClose: 4000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: 'light',
        style: {
          backgroundColor: 'transparent',
          boxShadow: '0px 2px 5px rgba(0,0,0,0.5)',
        },
      })
      handleRegister(response.userId)
      navigate('/auth/login')
    },
  })

  const formik = useFormik({
    initialValues,
    validationSchema: registrationSchema,
    onSubmit: ({ firstName, lastName, email, password, role }) => {
      const values = { firstName, lastName, email, password, role }
      mutate(values)
    },
  })

  return (
    <div className="flex items-center justify-between">
      <VerticalStepper />
      <div className="login-form-wrapper items-center " style={{ backgroundColor: 'white' }}>
        <div className="login-form-content">
          <h1 className="sign-in-header">Sign Up</h1>
        </div>
        <div className="buttons-wrapper">
          <GoogleBtn />
          <LinkedinBtn />
        </div>
        <div className="separator">
          <hr className="line" />
          <span>Or</span>
          <hr className="line" />
        </div>
        <form className="form-container" onSubmit={formik.handleSubmit} noValidate>
          <div className="input-wrapper">
            <div className="names-wrapper">
              <div className="flex w-full flex-col pr-2">
                <CustomInput
                  placeholder="FirstName"
                  type="string"
                  className="custom-input"
                  {...formik.getFieldProps('firstName')}
                />
                {formik.touched.firstName && formik.errors.firstName && (
                  <CustomErrors> {formik.errors.firstName} </CustomErrors>
                )}
              </div>
              <div className="flex w-full flex-col pl-2">
                <CustomInput
                  placeholder="LastName"
                  type="string"
                  className="custom-input"
                  {...formik.getFieldProps('lastName')}
                />
                {formik.touched.lastName && formik.errors.lastName && (
                  <CustomErrors> {formik.errors.lastName} </CustomErrors>
                )}
              </div>
            </div>
            <div className="relative w-full">
              <CustomInput
                placeholder="Email"
                type="string"
                className="custom-input"
                {...formik.getFieldProps('email')}
              />
              {formik.touched.email && formik.errors.email && (
                <CustomErrors> {formik.errors.email} </CustomErrors>
              )}
              <CustomInput
                placeholder="Password"
                type="password"
                className="custom-input"
                {...formik.getFieldProps('password')}
                isPasswordShown={showPassword}
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
            <div className="relative w-full">
              <CustomInput
                placeholder="Repeat Passsword"
                type="password"
                className="custom-input"
                {...formik.getFieldProps('verifyPassword')}
                isPasswordShown={showPassword}
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
          </div>
          <div className="mt-3 flex w-full flex-col">
            <div className="flex items-center self-start ">
              <input
                type="checkbox"
                className="form-checkbox h-4 w-4 text-yellow focus:text-fancyBlue"
                {...formik.getFieldProps('acceptTerms')}
              />
              <label className="pl-2 font-font text-darkBlue">
                {' '}
                I Agree to the terms and conditions
              </label>
            </div>
            {formik.touched.acceptTerms && formik.errors.acceptTerms && (
              <CustomErrors>{formik.errors.acceptTerms}</CustomErrors>
            )}
          </div>

          <div className="flex w-full flex-col pt-[8px]  ">
            <div className="flex items-center text-center">
              <CustomBtn
                type="submit"
                // disabled={formik.isSubmitting || !formik.isValid}
              >
                {!loading && <span>Sign Up</span>}
                {loading && <span>Please wait...</span>}
              </CustomBtn>
            </div>
            <p className="mt-[20px] mb-[30px] w-full  text-center text-[#05445E]">
              Already have an account ?{'  '}
              <Link to="/auth/login">
                <span className="btn-link2 ">Sign In</span>
              </Link>
            </p>
          </div>
        </form>
      </div>
    </div>
  )
}
