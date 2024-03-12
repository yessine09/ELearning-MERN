import { useEffect, useState } from 'react'
//import { fetchUser } from '../api/user'
import { useAuth } from '../contexts/Auth'
import User from '../models/User'

export default function useUser() {
  const [user, setUser] = useState<User | null>(null)
  const { authStatus } = useAuth()

  const accessToken = authStatus.status === 'loggedIn' ? authStatus.token : ''

  // useEffect(() => {
  //   fetchUser(accessToken).then((fetchedUser) => setUser(fetchedUser))
  // }, [])

  return { user }
}
