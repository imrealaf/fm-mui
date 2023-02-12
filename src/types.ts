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
  level?: number
}

export type AppBarPosition =
  | 'fixed'
  | 'absolute'
  | 'sticky'
  | 'static'
  | 'relative'
  | undefined
