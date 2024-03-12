import { useFormik } from "formik";
import { useState } from "react";
import { Link } from "react-router-dom";
import { ContentContainer, CustomBtn, CustomInput, GoogleBtn, LinkedinBtn } from ".";
import { loginSchema } from "../../yupSchemas";
import CustomErrors from "./CustomErrors";
import { logUser } from "../../../../api/user";
import { toast } from "react-toastify";
import { useAuth } from "../../../../contexts/Auth";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";
import { useMutation } from "react-query";

const initialValues = {
  email: '',
  password: '',
}
const Login = () => {
  const [loading, setLoading] = useState(false)
  const { handleLogin } = useAuth()
  const [showPassword, setShowPassword] = useState(false);
  const { mutate } = useMutation(logUser, {
    onSuccess: (data) => {
      if (data.status === "user not logged") {
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
      }
      toast.info(data.status, {
        position: "top-right",
        autoClose: 4000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        style: {
          backgroundColor: "transparent",
          boxShadow: "0px 2px 5px rgba(0,0,0,0.5)",
        },
      })
      handleLogin(data.token)
    },
    onError: (error) => {
      console.error(error);
      toast.error("Failed to login user.", {
        position: "top-right",
        theme: "colored",
        style: { backgroundColor: "#D40776", color: "white" },
      });

    },
  });

  const formik = useFormik({
    initialValues,
    validationSchema: loginSchema,
    onSubmit: ({ email, password }) => {
      const values = { email, password };
      mutate(values);
    }
  })

  return (
    <div>
      <ContentContainer />
      <div className="login-form-wrapper" style={{ backgroundColor: 'white' }}>
        <div className="login-form-content">
          <h1 className="sign-in-header">Sign In</h1>

          <div className="buttons-wrapper">
            <GoogleBtn />
            <LinkedinBtn />

          </div>
          <div className="separator">
            <hr className="line" />
            <span>Or</span>
            <hr className="line" />
          </div>
          <form
            className='form-container'
            onSubmit={formik.handleSubmit}
            noValidate
          >
            <div className="input-wrapper">
              <CustomInput placeholder="Email" type="string" className='custom-input' {...formik.getFieldProps('email')} />
              {formik.touched.email && formik.errors.email && (
                <CustomErrors> {formik.errors.email} </CustomErrors>
              )}
              <div className="w-full relative">
                <CustomInput placeholder="Password" type="password" className='custom-input' {...formik.getFieldProps('password')} isPasswordShown={showPassword} />
                <button
                  type="button"
                  onClick={() => setShowPassword((prev) => !prev)}
                  className="absolute bottom-3 right-2 text-[22px] bg-showpassSize text-fancyBlue"

                >
                  {!showPassword ? <AiFillEye /> : <AiFillEyeInvisible />}
                </button>
                {formik.touched.password && formik.errors.password && (
                  <CustomErrors> {formik.errors.password} </CustomErrors>
                )}
              </div>
            </div>

            <div className="w-full pt-[8px] flex flex-col  ">
              <Link to='/auth/forgotpassword'>
                <div className="btn-link">
                  Forgot your password?
                </div>
              </Link>
              <div className='text-center flex items-center'>
                <CustomBtn
                  type='submit'
                // disabled={formik.isSubmitting || !formik.isValid}
                >
                  {!loading && <span>Login</span>}
                  {loading && (
                    <span >
                      Please wait...
                      <span></span>
                    </span>
                  )}
                </CustomBtn>
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
        </div >
      </div >
    </div>
  );
}
export default Login;