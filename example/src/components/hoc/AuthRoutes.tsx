import React from 'react'
import { Navigate, Outlet } from 'react-router-dom'
import { useSelector } from 'react-redux'

import { selectUser } from '../../store/user'

const AuthRoutes = () => {
  const user = useSelector(selectUser)
  return user !== null ? <Navigate to='/dashboard' /> : <Outlet />
}

export default AuthRoutes
