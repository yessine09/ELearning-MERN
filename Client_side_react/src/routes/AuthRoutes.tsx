/* eslint-disable jsx-a11y/anchor-is-valid */
import { useEffect } from 'react'
import { Outlet, Route, Routes } from 'react-router-dom'
import { LoginForm } from '../features/auth/components/Login'
import { toAbsoluteUrl } from '../helpers/AssetHelpers'
import { Login } from '../pages/authPages'
import { Registration } from '../features/auth/components/register/Register'
import Profiling from '../features/auth/components/profiling/Profiling'
import ForgotPassword from '../features/auth/components/forgotPassword/ForgotPassword'
import VerificationCode from '../features/auth/components/forgotPassword/VerifyCode'
import PasswordPage from '../features/auth/components/forgotPassword/PasswordPage'
import ResetPassword from '../features/auth/components/forgotPassword/ResetPassword'


const AuthLayout = () => {
    useEffect(() => {
        document.body.style.backgroundImage = 'none'
        return () => { }
    }, [])

    return (
        <div
            className=' h-screen bg-cover bg-repeat-y'
            style={{
                backgroundImage: `url(${toAbsoluteUrl('/assets/images/bg/background.png')})`,
            }}
        >
            <Outlet />
        </div>
    )
}

const AuthPage = () => (
    <Routes>
        <Route element={<AuthLayout />}>
            <Route path='login' element={<Login />} />
            <Route path='register' element={<Registration />} />
            <Route index element={<Login />} />
            <Route element={<PasswordPage />}>
                <Route path='forgotpassword' element={<ForgotPassword />} />
                <Route path='verifycode' element={<VerificationCode />} />
            </Route>
            <Route path='resetpassword' element={<ResetPassword />} />
        </Route>
    </Routes>
)

export { AuthPage }
