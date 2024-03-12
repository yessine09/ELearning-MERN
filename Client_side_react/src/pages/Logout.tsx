import { useEffect } from 'react'
import { Navigate, Routes } from 'react-router-dom'
import { useAuth } from '../contexts/Auth'

export function Logout() {
  const { logoutUser } = useAuth()
  useEffect(() => {
    logoutUser()
    document.location.reload()
  }, [logoutUser])

  return (
    <Routes>
      <Navigate to='/auth/login' />
    </Routes>
  )
}
