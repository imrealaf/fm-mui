import React from 'react'
import { Link, LinkProps } from 'react-router-dom'

const UnstyledRouterLink = ({ children, ...rest }: LinkProps) => {
  return (
    <Link
      {...rest}
      style={{
        color: 'inherit',
        textDecoration: 'none'
      }}
    >
      {children}
    </Link>
  )
}

export default UnstyledRouterLink
