import { MenuItemRecord } from 'fm-mui'
import ManageAccountsIcon from '@mui/icons-material/ManageAccounts'
import SettingsIcon from '@mui/icons-material/Settings'
import DashboardIcon from '@mui/icons-material/Dashboard'
import PostAddIcon from '@mui/icons-material/PostAdd'

import * as paths from 'routes/paths'

export const publicMenu: MenuItemRecord[] = [
  {
    title: 'Home',
    path: paths.HOME_ROUTE
  }
]

export const privateMenu: MenuItemRecord[] = [
  {
    title: 'Dashboard',
    path: paths.DASHBOARD_ROUTE,
    icon: DashboardIcon
  },
  {
    title: 'Posts',
    icon: PostAddIcon,
    childItems: [
      {
        title: 'Add Post',
        path: paths.POSTS_ADD_ROUTE
      },
      {
        title: 'View All',
        path: paths.POSTS_ROUTE
      }
    ]
  }
]

export const userMenuItems: MenuItemRecord[] = [
  {
    title: 'My Account',
    path: paths.ACCOUNT_ROUTE,
    icon: ManageAccountsIcon
  },
  {
    title: 'Settings',
    path: paths.SETTINGS_ROUTE,
    icon: SettingsIcon
  }
]
