import React from 'react'
import {
  Box,
  Drawer as MuiDrawer,
  DrawerProps as MuiDrawerProps,
  styled
} from '@mui/material'

import config, { getProp } from '../config'

export interface DrawerProps extends MuiDrawerProps {}

const StyledDrawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== 'drawerWidth'
})<DrawerProps & { drawerWidth: number }>(
  ({ theme, drawerWidth, variant, anchor }) => ({
    width: anchor !== 'top' ? drawerWidth : '',
    flexShrink: 0,
    '& .MuiDrawer-paper': {
      width: anchor !== 'top' ? drawerWidth : '',
      boxSizing: 'border-box',

      ...(variant === 'permanent' && {
        zIndex: theme.zIndex.appBar - 1
      })
    }
  })
)

const Drawer = ({ variant, anchor, children, ...rest }: DrawerProps) => {
  const headerHeight = getProp('ResponsiveHeader', 'height')
  return (
    <StyledDrawer
      anchor={anchor}
      variant={variant}
      drawerWidth={config.global.drawerWidth}
      {...rest}
    >
      <Box sx={{ height: variant === 'permanent' ? headerHeight : 0 }} />
      {children}
    </StyledDrawer>
  )
}

export default Drawer
