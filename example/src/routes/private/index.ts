import * as paths from 'routes/paths'

import DashboardRoute from './DashboardRoute'
import PostsRoute from './PostsRoute'
import AccountRoute from './AccountRoute'
import PersonalInfoRoute from './account/PersonalInfoRoute'
import AccountNameRoute from './account/AccountNameRoute'
import AccountGenderRoute from './account/AccountGenderRoute'
import AccountBirthdayRoute from './account/AccountBirthdayRoute'

import SettingsRoute from './SettingsRoute'

const privateRoutes = [
  {
    component: DashboardRoute,
    path: paths.DASHBOARD_ROUTE
  },
  {
    component: PostsRoute,
    path: paths.POSTS_ROUTE
  },
  {
    component: AccountRoute,
    path: paths.ACCOUNT_ROUTE
  },
  {
    component: PersonalInfoRoute,
    path: paths.ACCOUNT_PERSONAL_INFO_ROUTE
  },
  {
    component: AccountNameRoute,
    path: paths.ACCOUNT_NAME_ROUTE
  },
  {
    component: AccountGenderRoute,
    path: paths.ACCOUNT_GENDER_ROUTE
  },
  {
    component: AccountBirthdayRoute,
    path: paths.ACCOUNT_BIRTHDAY_ROUTE
  },
  {
    component: SettingsRoute,
    path: paths.SETTINGS_ROUTE
  }
]

export default privateRoutes
