import React from 'react'
import { ResponsiveMain } from 'fm-mui'

import { LayoutProps } from '.'
import { mainMenu } from '../menus'
import PrivateHeader from '../components/PrivateHeader'
import SideNav from '../components/SideNav'

const PrivateLayout = ({ route }: LayoutProps) => {
  return (
    <>
      <PrivateHeader mobileMenuItems={mainMenu} />
      <ResponsiveMain drawer={<SideNav items={mainMenu} />}>
        {route}
      </ResponsiveMain>
    </>
  )
}

export default PrivateLayout
