import { MenuItemRecord } from 'fm-mui'

import * as paths from './routes/paths'

export const mainMenu: MenuItemRecord[] = [
  {
    title: 'Home',
    url: paths.HOME_ROUTE
  },
  {
    title: 'Components',
    childItems: [
      {
        title: 'Responsive Header',
        url: paths.RESPONSIVE_HEADER_ROUTE
      }
    ]
  }
]
