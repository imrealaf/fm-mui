import React from 'react'
import { ResponsiveMain } from 'fm-mui'

import { LayoutProps } from '.'
import { publicMenu } from '../menus'
import Header from '../components/Header'

const PublicLayout = ({ route }: LayoutProps) => {
  return (
    <>
      <Header mobileMenuItems={publicMenu} />
      <ResponsiveMain>{route}</ResponsiveMain>
    </>
  )
}

export default PublicLayout
