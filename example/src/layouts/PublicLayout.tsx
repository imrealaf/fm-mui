import React from 'react'
import { ResponsiveMain } from 'fm-mui'

import { LayoutProps } from '.'
import { mainMenu } from '../menus'
import Header from '../components/Header'
import SideNav from '../components/SideNav'

const PublicLayout = ({ route }: LayoutProps) => {
  return (
    <>
      <Header mobileMenuItems={mainMenu} />
      <ResponsiveMain drawer={<SideNav items={mainMenu} />}>
        {route}
      </ResponsiveMain>
    </>
  )
}

export default PublicLayout
