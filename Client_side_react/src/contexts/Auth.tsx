import Cookies from 'js-cookie'
import jwt_decode from 'jwt-decode'
import { ReactNode, createContext, useContext, useMemo, useState } from 'react'
import { checkprofile } from '../api/user'

type AuthStatus =
  | {
      profileStatus: 'profile not created' | 'profile created'
      status: 'loggedIn'
      token: string
      roleName: string
      userId: string
    }
  | {
      profileStatus: ''
      status: 'loggedOut'
    }

type AuthContextProps = {
  authStatus: AuthStatus
  handleLogin: (token: string) => void
  logoutUser: () => void
  handleRegister: (userId: string) => void
  userId?: string
}

const AuthContext = createContext<AuthContextProps>({
  authStatus: { status: 'loggedOut', profileStatus: '' },
  handleLogin: (token: string) => {},
  logoutUser: () => {},
  handleRegister: (userId: string) => {},
})

export const useAuth = () => useContext(AuthContext)

type AuthProviderProps = { children: ReactNode }
export default function AuthProvider({ children }: AuthProviderProps) {
  const [authStatus, setAuthStatus] = useState<AuthStatus>(() => {
    const token = Cookies.get('access_token')
    let roleName = ''
    let userId = ''

    if (token) {
      const decodedToken = jwt_decode(token) as { roles: string[]; userId: string }
      const roles = decodedToken.roles
      roleName = roles[0]
      userId = decodedToken.userId
    }

    return token
      ? { status: 'loggedIn', token, roleName, userId, profileStatus: 'profile not created' }
      : { status: 'loggedOut', profileStatus: '' }
  })

  const handleLogin = async (token: string) => {
    // const decodedToken = jwt_decode(token) as { roles: string[], userId: string }
    const decodedToken = jwt_decode(token) as { roles: string[]; userId: string }

    const roles = decodedToken.roles
    const roleName = roles[0]
    const userId = decodedToken.userId
    Cookies.set('userId', userId)
    try {
      Cookies.set('access_token', token, { httpOnly: false })
      const { status } = await checkprofile(userId)
      const profileStatus = status
      setAuthStatus({ status: 'loggedIn', token, roleName, userId, profileStatus })
      console.log('role', roleName)
    } catch (error) {
      console.log(error)
    }
  }

  const handleRegister = (userId: string) => {
    Cookies.set('userId', userId)
  }

  const logoutUser = () => {
    Cookies.remove('access_token')
    Cookies.remove('userId')
    setAuthStatus({ status: 'loggedOut', profileStatus: '' })
  }

  return (
    <AuthContext.Provider value={{ authStatus, handleLogin, logoutUser, handleRegister }}>
      {children}
    </AuthContext.Provider>
  )
}
