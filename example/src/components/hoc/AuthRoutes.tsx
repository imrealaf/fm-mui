import React from 'react'
import { Navigate, Outlet } from 'react-router-dom'

import { useAppSelector, useQuery } from 'hooks'
import { signInRedirect } from 'config'
import { selectUser } from 'store/user'

const AuthRoutes = () => {
  const user = useAppSelector(selectUser)
  const query = useQuery()
  const ref = query.get('ref')
  return user !== null ? (
    <Navigate to={ref || signInRedirect} replace />
  ) : (
    <Outlet />
  )
}

export default AuthRoutes
