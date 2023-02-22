import * as paths from 'routes/paths'

import SignInRoute from './SignInRoute'
import SignUpRoute from './SignUpRoute'

const authRoutes = [
  {
    component: SignInRoute,
    path: paths.SIGN_IN_ROUTE
  },
  {
    component: SignUpRoute,
    path: paths.SIGN_UP_ROUTE
  }
]

export default authRoutes
