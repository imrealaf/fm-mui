import React from 'react'
import { styled } from '@mui/material'

import config, { getProps } from 'config'
import { DrawerPosition } from 'types'
import { useBreakpoint } from 'hooks'

const defaultProps = config.ResponsiveMain.defaultProps

export interface ResponsiveMainProps {
  testId?: string
  drawer?: React.ReactNode
  drawerPosition?: DrawerPosition
  children: React.ReactNode
}

const StyledMain = styled('main', {
  shouldForwardProp: (prop) =>
    prop !== 'offsetTop' &&
    prop !== 'offsetX' &&
    prop !== 'drawerPosition' &&
    prop !== 'headerHeight' &&
    prop !== 'headerHeightSm'
})<
  Partial<ResponsiveMainProps> & {
    offsetTop: boolean
    offsetX: boolean
    headerHeight: number
    headerHeightSm: number
  }
>(
  ({
    theme,
    offsetTop,
    offsetX,
    drawerPosition,
    headerHeight,
    headerHeightSm
  }) => ({
    ...(offsetTop && {
      paddingTop: `${headerHeight}px`,
      [theme.breakpoints.down(config.global.mobileBp)]: {
        paddingTop: `${headerHeightSm}px`
      }
    }),
    ...(offsetX && {
      [theme.breakpoints.up(config.global.desktopBp)]: {
        ...(drawerPosition === 'right'
          ? {
              paddingRight: `${config.global.drawerWidth}px`
            }
          : {
              paddingLeft: `${config.global.drawerWidth}px`
            })
      }
    })
  })
)

const ResponsiveMain = ({
  testId = 'responsive-main',
  drawer,
  drawerPosition = defaultProps.drawerPosition,
  children
}: ResponsiveMainProps) => {
  const headerProps = getProps('ResponsiveHeader')
  const bp = useBreakpoint()
  return (
    <>
      {drawer && bp[config.global.desktopBpQuery] ? drawer : null}
      <StyledMain
        data-testid={testId}
        offsetTop={headerProps.position === 'fixed'}
        offsetX={drawer !== undefined ? true : false}
        headerHeight={headerProps.height}
        headerHeightSm={headerProps.heightSm}
        drawerPosition={drawerPosition}
      >
        {children}
      </StyledMain>
    </>
  )
}

export default ResponsiveMain
