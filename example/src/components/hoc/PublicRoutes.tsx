import React from 'react'
import { Navigate, Outlet } from 'react-router-dom'

import { useAppSelector } from 'hooks'
import { signInRedirect } from 'config'
import { selectUser } from 'store/user'

const PublicRoutes = () => {
  const user = useAppSelector(selectUser)
  return user !== null ? <Navigate to={signInRedirect} replace /> : <Outlet />
}

export default PublicRoutes
