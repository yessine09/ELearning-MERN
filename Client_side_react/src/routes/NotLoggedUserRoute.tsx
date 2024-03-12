import { Navigate, Outlet } from 'react-router-dom'
import { useAuth } from '../contexts/Auth'

export default function NotLoggedUserRoute() {
  const { authStatus } = useAuth()
  return authStatus.status === 'loggedOut' ? <Outlet /> : <Navigate to="/profile" />
}
