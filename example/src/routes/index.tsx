import React from 'react'
import { Routes as BrowserRoutes, Route } from 'react-router-dom'

import { PublicLayout, AuthLayout } from '../layouts'
import AuthRoutes from '../components/hoc/AuthRoutes'
// import PrivateRoutes from '../components/hoc/PrivateRoutes'
import PublicRoutes from '../components/hoc/PublicRoutes'

import authRoutes from './auth'
import publicRoutes from './public'

const Routes = () => {
  return (
    <BrowserRoutes>
      <Route element={<AuthRoutes />}>
        {authRoutes.map((route) => {
          const { path, component } = route
          return (
            <Route
              path={path}
              key={path}
              element={<AuthLayout route={React.createElement(component)} />}
            />
          )
        })}
      </Route>
      <Route element={<PublicRoutes />}>
        {publicRoutes.map((route) => {
          const { path, component } = route
          return (
            <Route
              path={path}
              key={path}
              element={<PublicLayout route={React.createElement(component)} />}
            />
          )
        })}
      </Route>
    </BrowserRoutes>
  )
}

export default Routes
