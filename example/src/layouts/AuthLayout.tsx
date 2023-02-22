import React from 'react'

import { LayoutProps } from '.'

const AuthLayout = ({ route }: LayoutProps) => {
  return <main>{route}</main>
}

export default AuthLayout
