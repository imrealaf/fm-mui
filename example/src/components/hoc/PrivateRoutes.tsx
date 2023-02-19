import React from 'react'
import { Navigate, Outlet, useLocation } from 'react-router-dom'
import { useSelector } from 'react-redux'

import { selectUser } from '../../store/user'

const PrivateRoutes = () => {
  const { pathname } = useLocation()
  const user = useSelector(selectUser)
  return user !== null ? (
    <Outlet />
  ) : (
    <Navigate to={`/sign-in?ref=${encodeURI(pathname)}`} />
  )
}

export default PrivateRoutes
