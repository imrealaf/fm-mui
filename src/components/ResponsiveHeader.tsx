import React, { useEffect, useState } from 'react'
import {
  AppBar,
  AppBarProps,
  styled,
  Toolbar,
  Box,
  Link,
  Menu,
  MenuItem
} from '@mui/material'
import { Spiral as Hamburger } from 'hamburger-react'

import config from '../config'
import { hasChildItems, transformData } from '../utils'
import MobileMenu from './MobileMenu'
import { ThemeColorProp, MenuItemRecord } from '../types'
import { useBreakpoint, useToggleByAnchor } from '../hooks'

const BURGER_HEIGHT = 48

export interface ResponsiveHeaderProps extends AppBarProps {
  height?: number
  heightSm?: number
  brand?: React.ReactNode
  brandPosition?: 'left' | 'center'
  actions?: React.ReactNode
  hideActionsOnToggle?: boolean
  hideOnScroll?: boolean
  open?: boolean
  menuColor?: ThemeColorProp
  menuItems?: MenuItemRecord[]
  menuHeader?: React.ReactNode
  menuFooter?: React.ReactNode
  menuIconSize?: number
  onToggle(): void
  scrollOffset?: number
}

const StyledResponsiveHeader = styled(AppBar, {
  shouldForwardProp: (prop) =>
    prop !== 'showActions' &&
    prop !== 'heightSm' &&
    prop !== 'hideActionsOnToggle' &&
    prop !== 'brandPosition'
})<Partial<ResponsiveHeaderProps> & { showActions: boolean }>(
  ({
    theme,
    open,
    height = config.ResponsiveHeader.defaultProps.height,
    heightSm = config.ResponsiveHeader.defaultProps.heightSm,
    brandPosition = 'center',
    hideActionsOnToggle,
    showActions
  }) => ({
    '.MuiToolbar-root': {
      height: height,
      minHeight: height,
      [theme.breakpoints.down('sm')]: {
        padding: 0,
        height: heightSm,
        minHeight: heightSm
      }
    },

    '.hamburger-react': {
      position: 'fixed !important',
      left: `${theme.spacing(1)} !important`,
      top: (heightSm - BURGER_HEIGHT) / 2
    },

    '.ResponsiveHeader-actions': {
      transition: 'all .2s ease',

      [theme.breakpoints.down('sm')]: {
        position: 'absolute',
        right: `${theme.spacing(0.5)}`,
        top: '50%',
        transform: 'translateY(-50%)'
      },

      ...(hideActionsOnToggle &&
        open && {
          opacity: 0
        }),
      ...(!showActions && {
        display: 'none'
      })
    },

    '.ResponsiveHeader-content': {
      position: 'relative',
      zIndex: theme.zIndex.appBar + 2,
      display: 'flex',
      justifyContent: 'space-between',
      width: '100%',
      height: '100%',
      alignItems: 'center',
      [theme.breakpoints.down('sm')]: {
        justifyContent: brandPosition === 'center' ? 'center' : 'flex-start'
      }
    },

    '.ResponsiveHeader-menu': {
      display: 'flex',
      alignItems: 'center',
      marginRight: theme.spacing(1),

      '.MuiLink-root': {
        textDecoration: 'none'
      },

      '.ResponsiveHeaderMenu-link': {
        padding: `${theme.spacing(1)} ${theme.spacing(1)}`
      }
    },

    '.ResponsiveHeader-brand': {
      [theme.breakpoints.down('sm')]: {
        ...(brandPosition === 'left' && {
          marginLeft: theme.spacing(8)
        })
      }
    }
  })
)

interface DesktopMenuProps {
  items: MenuItemRecord[]
}

const DesktopMenu = ({ items = [] }: DesktopMenuProps) => {
  return (
    <Box className='ResponsiveHeader-menu'>
      {items.map((item) => {
        const dd = useToggleByAnchor()
        const linkProps = hasChildItems(item)
          ? {
              onClick: dd.show
            }
          : {}
        return (
          <>
            <Link
              className='ResponsiveHeaderMenu-link'
              color='inherit'
              {...linkProps}
            >
              {item.title}
            </Link>
            {hasChildItems(item) && (
              <Menu open={dd.open} anchorEl={dd.anchorEl} onClose={dd.hide}>
                {item.childItems?.map((childItem) => (
                  <MenuItem>{childItem.title}</MenuItem>
                ))}
              </Menu>
            )}
          </>
        )
      })}
    </Box>
  )
}

const ResponsiveHeader = ({
  position = config.ResponsiveHeader.defaultProps.position,
  height = config.ResponsiveHeader.defaultProps.height,
  heightSm = config.ResponsiveHeader.defaultProps.heightSm,
  brand = 'App',
  brandPosition,
  color = config.ResponsiveHeader.defaultProps.color,
  actions,
  hideOnScroll = false,
  hideActionsOnToggle = false,
  open = false,
  menuItems = [],
  menuColor = 'secondary',
  menuIconSize = 21,
  menuHeader,
  menuFooter,
  onToggle
}: ResponsiveHeaderProps) => {
  const bp = useBreakpoint()
  const [pageY, setPageY] = useState(0)
  const [lastScrollPosition, setLastScrollPosition] = useState(0)
  const [show, setShow] = useState(true)
  const [showActions, setShowActions] = useState(true)
  const scrollValue = bp.smAndDown ? heightSm : height
  const hasMenuItems = menuItems && menuItems.length > 0

  if (hasMenuItems) {
    transformData(menuItems)
  }

  const onScroll = () => {
    setPageY(window.pageYOffset)
  }

  const initScrollEvent = () => {
    setPageY(window.pageYOffset)
    setLastScrollPosition(pageY)
    window.addEventListener('scroll', onScroll)
  }

  useEffect(() => {
    setTimeout(() => {
      setShowActions(open && hideActionsOnToggle ? false : true)
    }, config.MobileMenu.transitionDuration)
  }, [open])

  useEffect(() => {
    // if (bgOnScroll) {
    //   setIsTransparent(pageY > scrollValue ? false : true);
    //   setShadow(pageY > scrollValue ? true : false);
    // }

    if (pageY < 0) {
      return
    }

    if (Math.abs(pageY - lastScrollPosition) < scrollValue) {
      return
    }

    if (open) {
      return
    }

    if (!hideOnScroll) {
      return
    }

    setShow(pageY < lastScrollPosition)

    if (!show) {
      document.body.classList.add('header-hidden')
    } else {
      document.body.classList.remove('header-hidden')
    }

    setLastScrollPosition(pageY)
  }, [pageY])

  useEffect(() => {
    if (hideOnScroll) initScrollEvent()
    return () => {
      window.removeEventListener('scroll', onScroll)
    }
  }, [])

  return (
    <StyledResponsiveHeader
      position={position}
      height={height}
      heightSm={heightSm}
      brandPosition={brandPosition}
      color={color}
      open={open}
      hideActionsOnToggle={hideActionsOnToggle}
      showActions={showActions}
      sx={{
        transition: hideOnScroll ? 'all .2s ease !important' : '',
        transform: !show ? 'translate3d(0, -100%, 0) !important' : ''
      }}
    >
      <Toolbar>
        {bp.smAndDown && (
          <MobileMenu
            open={open}
            items={menuItems}
            onToggle={onToggle}
            color={menuColor}
            header={menuHeader}
            footer={menuFooter}
            headerHeight={heightSm}
          />
        )}
        <Box className='ResponsiveHeader-content'>
          {bp.smAndDown ? (
            <>
              <Hamburger
                size={menuIconSize}
                toggled={open}
                toggle={onToggle}
                hideOutline={true}
              />
              {brand && <Box className='ResponsiveHeader-brand'>{brand}</Box>}
              {actions && (
                <Box className='ResponsiveHeader-actions'>{actions}</Box>
              )}
            </>
          ) : (
            <>
              <Box>
                {brand && <Box className='ResponsiveHeader-brand'>{brand}</Box>}
              </Box>
              <Box display='flex'>
                {hasMenuItems && <DesktopMenu items={menuItems} />}
                {actions && (
                  <Box className='ResponsiveHeader-actions'>{actions}</Box>
                )}
              </Box>
            </>
          )}
        </Box>
      </Toolbar>
    </StyledResponsiveHeader>
  )
}

export default ResponsiveHeader
