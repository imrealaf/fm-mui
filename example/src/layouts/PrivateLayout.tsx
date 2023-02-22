import React from 'react'
import { ResponsiveMain } from 'fm-mui'

import { LayoutProps } from '.'
import { privateMenu } from 'menus'
import PrivateHeader from 'components/PrivateHeader'
import SideNav from 'components/SideNav'

const PrivateLayout = ({ route }: LayoutProps) => {
  return (
    <>
      <PrivateHeader mobileMenuItems={privateMenu} />
      <ResponsiveMain drawer={<SideNav items={privateMenu} />}>
        {route}
      </ResponsiveMain>
    </>
  )
}

export default PrivateLayout
