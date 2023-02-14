import React from 'react'
import { styled } from '@mui/material'

import { getProps } from '../config'

export interface ResponsiveMainProps {
  children: React.ReactNode
}

const StyledMain = styled('main')<{
  offsetTop: boolean
  headerHeight: number
  headerHeightSm: number
}>(({ theme, offsetTop, headerHeight, headerHeightSm }) => ({
  ...(offsetTop && {
    paddingTop: `${headerHeight}px`,
    [theme.breakpoints.down('sm')]: {
      paddingTop: `${headerHeightSm}px`
    }
  })
}))

const ResponsiveMain = ({ children }: ResponsiveMainProps) => {
  const headerProps = getProps('ResponsiveHeader')
  return (
    <StyledMain
      offsetTop={headerProps.position === 'fixed'}
      headerHeight={headerProps.height}
      headerHeightSm={headerProps.heightSm}
    >
      {children}
    </StyledMain>
  )
}

export default ResponsiveMain
