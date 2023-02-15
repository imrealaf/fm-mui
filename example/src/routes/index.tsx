import React, { useEffect } from 'react'
import {
  Routes as BrowserRoutes,
  Route,
  RouteProps,
  useLocation
} from 'react-router-dom'

import * as paths from './paths'
import HomeRoute from './HomeRoute'
import ResponsiveHeaderRoute from './ResponsiveHeaderRoute'

export const routes: RouteProps[] = [
  {
    path: paths.HOME_ROUTE,
    element: <HomeRoute />,
    index: true
  },
  {
    path: paths.RESPONSIVE_HEADER_ROUTE,
    element: <ResponsiveHeaderRoute />
  }
]

const Routes = () => {
  const { pathname } = useLocation()

  useEffect(() => {}, [pathname])

  return (
    <BrowserRoutes>
      {routes.map((route) => (
        <Route key={route.path} {...route} />
      ))}
    </BrowserRoutes>
  )
}

export default Routes
