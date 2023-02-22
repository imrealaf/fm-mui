import { getAuth, updateProfile } from 'firebase/auth'

import { useAppDispatch, useAppSelector, useProfile } from '.'
import { selectUser, setUser, sanitizeUserData } from 'store/user'

const useUser = () => {
  const user = useAppSelector(selectUser)
  const dispatch = useAppDispatch()
  const profile = useProfile()

  const updateUser = async (data: Record<string, any>) => {
    if (!user) return
    try {
      await updateProfile(user, data)
      const currentUser = getAuth().currentUser
      if (currentUser) {
        dispatch(setUser(sanitizeUserData(currentUser)))
      }
      return true
    } catch (error) {
      return Promise.reject(error)
    }
  }

  const getInitials = () => {
    if (!user) return ''
    return user.displayName?.substring(0, 1) || user.email?.substring(0, 1)
  }

  return {
    user,
    updateUser,
    getInitials,
    ...profile
  }
}

export default useUser
