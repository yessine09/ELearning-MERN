import { Navigate, Outlet, useNavigate } from 'react-router-dom'
import { useAuth } from '../contexts/Auth'
import { useEffect } from 'react'

export default function LoggedUserRoute() {
  const { authStatus } = useAuth()
  const navigate = useNavigate()

  useEffect(() => {
    if (authStatus.status === 'loggedIn') {
      if (authStatus.roleName === 'admin') {
        navigate('/admin/dashboard')
      } else if (authStatus.roleName === 'mentor') {
        navigate('/mentor/dashboard')
      } else if (authStatus.roleName === 'content_creator') {
        navigate('/content-creator/dashboard')
      } else if (authStatus.roleName === 'entreprise') {
        navigate('/entreprise/dashboard')
      } else if (authStatus.roleName === 'user' && authStatus.profileStatus === 'profile not created') {
        navigate('/profiling')
      }
    }
  }, [])

  return authStatus.status === 'loggedIn' ? <Outlet /> : <Navigate to="/login" />
}
