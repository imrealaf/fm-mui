import React from 'react'
import { Navigate, Outlet, useLocation } from 'react-router-dom'

import { useAppSelector } from 'hooks'
import { SIGN_IN_ROUTE } from 'routes/paths'
import { selectUser } from 'store/user'

const PrivateRoutes = () => {
  const { pathname } = useLocation()
  const user = useAppSelector(selectUser)
  return user !== null ? (
    <Outlet />
  ) : (
    <Navigate to={`${SIGN_IN_ROUTE}?ref=${encodeURI(pathname)}`} replace />
  )
}

export default PrivateRoutes
