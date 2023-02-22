import * as paths from 'routes/paths'

import HomeRoute from './HomeRoute'

const publicRoutes = [
  {
    component: HomeRoute,
    path: paths.HOME_ROUTE
  }
]

export default publicRoutes
