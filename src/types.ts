import { SvgIcon } from '@mui/material'

export type ThemeColorProp =
  | 'inherit'
  | 'primary'
  | 'secondary'
  | 'default'
  | 'transparent'

export interface MenuItemRecord {
  title: string
  url?: string
  active?: boolean
  childItems?: MenuItemRecord[]
  parent?: MenuItemRecord
  grandparent?: MenuItemRecord
  level?: number
  icon?: typeof SvgIcon
}

export type AppBarPosition =
  | 'fixed'
  | 'absolute'
  | 'sticky'
  | 'static'
  | 'relative'
  | undefined

export type DrawerPosition = 'left' | 'right'

export type BreakpointQuery =
  | 'xs'
  | 'smAndDown'
  | 'smAndUp'
  | 'sm'
  | 'mdAndDown'
  | 'mdAndUp'
  | 'md'
  | 'lgAndDown'
  | 'lgAndUp'
  | 'lg'
  | 'xlAndDown'
  | 'xlAndUp'
  | 'xl'
