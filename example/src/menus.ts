import { MenuItemRecord } from 'fm-mui'
import ManageAccountsIcon from '@mui/icons-material/ManageAccounts'
import SettingsIcon from '@mui/icons-material/Settings'

import * as paths from 'routes/paths'

export const publicMenu: MenuItemRecord[] = [
  {
    title: 'Home',
    url: paths.HOME_ROUTE
  }
]

export const privateMenu: MenuItemRecord[] = [
  {
    title: 'Dashboard',
    url: paths.DASHBOARD_ROUTE
  }
]

export const userMenuItems: MenuItemRecord[] = [
  {
    title: 'My Account',
    url: paths.ACCOUNT_ROUTE,
    icon: ManageAccountsIcon
  },
  {
    title: 'Settings',
    url: paths.SETTINGS_ROUTE,
    icon: SettingsIcon
  }
]
