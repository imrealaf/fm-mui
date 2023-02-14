import { AppBarPosition, ThemeColorProp } from './types'

type ResponsiveHeaderDefaultProps = {
  height: number
  heightSm: number
  position: AppBarPosition
  color: ThemeColorProp
}

type ResponsiveMainDefaultProps = {
  headerHeight: number
  headerHeightSm: number
  offsetTop: boolean
}

type MobileMenuConfig = {
  transitionDuration: number
}

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
    headerHeight: ResponsiveHeader.defaultProps.height,
    headerHeightSm: ResponsiveHeader.defaultProps.heightSm,
    offsetTop: true
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

export const getProps = (name: string) => componentProps[name] || {}

export default {
  ResponsiveHeader,
  MobileMenu,
  ResponsiveMain
}
