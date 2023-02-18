import React, { useEffect } from 'react'
import {
  Routes as BrowserRoutes,
  Route,
  RouteProps,
  useLocation
} from 'react-router-dom'

import * as paths from './paths'
import HomeRoute from './HomeRoute'

export const routes: RouteProps[] = [
  {
    path: paths.HOME_ROUTE,
    element: <HomeRoute />,
    index: true
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
