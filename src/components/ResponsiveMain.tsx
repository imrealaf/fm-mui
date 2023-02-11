import React from 'react'
import { styled } from '@mui/material'

import config from '../config'

export interface ResponsiveMainProps {
  offsetTop?: boolean
  headerHeight?: number
  headerHeightSm?: number
  children: React.ReactNode
}

const StyledMain = styled('main')<ResponsiveMainProps>(
  ({ theme, offsetTop, headerHeight, headerHeightSm }) => ({
    ...(offsetTop && {
      paddingTop: `${headerHeight}px`,
      [theme.breakpoints.down('sm')]: {
        paddingTop: `${headerHeightSm}px`
      }
    })
  })
)

const ResponsiveMain = ({
  offsetTop = config.ResponsiveMain.defaultProps.offsetTop,
  headerHeight = config.ResponsiveMain.defaultProps.headerHeight,
  headerHeightSm = config.ResponsiveMain.defaultProps.headerHeightSm,
  children
}: ResponsiveMainProps) => {
  return (
    <StyledMain
      offsetTop={offsetTop}
      headerHeight={headerHeight}
      headerHeightSm={headerHeightSm}
    >
      {children}
    </StyledMain>
  )
}

export default ResponsiveMain
