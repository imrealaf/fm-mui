import { useAppSelector } from '.'
import { selectUser } from '../store/user'

const useUser = () => {
  const user = useAppSelector(selectUser)

  const getInitials = () => {
    if (!user) return ''
    return user.displayName?.substring(0, 1) || user.email?.substring(0, 1)
  }

  return {
    user,
    getInitials
  }
}

export default useUser
