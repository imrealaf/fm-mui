import { Breakpoint } from '@mui/material'

import {
  AppBarPosition,
  ThemeColorProp,
  BreakpointQuery,
  DrawerPosition
} from './types'

type GlobalConfig = {
  mobileBpQuery: BreakpointQuery
  mobileBp: Breakpoint
  desktopBpQuery: BreakpointQuery
  desktopBp: Breakpoint
  drawerWidth: number
}

type ResponsiveHeaderDefaultProps = {
  height: number
  heightSm: number
  position: AppBarPosition
  color: ThemeColorProp
}

type ResponsiveMainDefaultProps = {
  drawerPosition: DrawerPosition
}

type MobileMenuConfig = {
  transitionDuration: number
}

const global = {
  mobileBpQuery: 'smAndDown',
  mobileBp: 'sm',
  desktopBpQuery: 'mdAndUp',
  desktopBp: 'md',
  drawerWidth: 250
} as GlobalConfig

const ResponsiveHeader = {
  defaultProps: {
    height: 64,
    heightSm: 56,
    position: 'fixed',
    color: 'primary'
  } as ResponsiveHeaderDefaultProps
}

const MobileMenu = {
  transitionDuration: 400
} as MobileMenuConfig

const ResponsiveMain = {
  defaultProps: {
    drawerPosition: 'left'
  } as ResponsiveMainDefaultProps
}

const componentProps = {
  ResponsiveHeader: {
    ...ResponsiveHeader.defaultProps
  }
}

export const setProps = (name: string, props: Record<string, any>) => {
  componentProps[name] = {
    ...componentProps[name],
    ...props
  }
}

export const getProp = (name: string, prop: string) =>
  componentProps[name] ? componentProps[name][prop] : null

export const getProps = (name: string) => componentProps[name] || {}

export default {
  global,
  ResponsiveHeader,
  MobileMenu,
  ResponsiveMain
}
