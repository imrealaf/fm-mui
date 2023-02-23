import React, { useEffect } from 'react'
import { styled, List, ListItemButton, ListItemText, Box } from '@mui/material'
import ChevronRightIcon from '@mui/icons-material/ChevronRight'
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft'
import { useSwipeable } from 'react-swipeable'

import config, { getProps } from '../config'
import { hasChildItems, transformData } from '../utils'
import { MenuItemRecord, ThemeColorProp } from '../types'
import SlidingMenu from './SlidingMenu'
import { useSlidingMenu } from '../hooks'

export interface MobileMenuProps {
  testId?: string
  open?: boolean
  color?: ThemeColorProp
  items?: MenuItemRecord[]
  header?: React.ReactNode
  footer?: React.ReactNode
  onToggle?(): void
}

interface MobileMenuSectionProps {
  testId?: string
  section: MenuItemRecord | null
  handleBackClick(): void
  handleItemClick(item: MenuItemRecord): void
}

const StlyedMobileMenu = styled(Box, {
  shouldForwardProp: (prop) => prop !== 'headerHeight'
})<Partial<MobileMenuProps> & { headerHeight: number }>(
  ({
    theme,
    open,
    color = 'secondary',
    headerHeight = config.ResponsiveHeader.defaultProps.heightSm
  }) => ({
    position: 'absolute',
    background: theme.palette[color].main,
    width: '100%',
    top: 0,
    left: 0,
    zIndex: theme.zIndex.appBar + 1,
    transition: `all  ${config.MobileMenu.transitionDuration}ms ease`,

    '.MobileMenu-header': {
      height: headerHeight,
      opacity: 0,
      transition: `all .2s ease ${config.MobileMenu.transitionDuration}ms`,
      ...(open && {
        opacity: 1
      })
    },

    '.MobileMenu-content': {
      opacity: 0,
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'space-between',
      height: `calc(100vh - ${headerHeight}px)`,
      transform: 'scale(1.05)',
      transition: `all .2s ease ${
        config.MobileMenu.transitionDuration - 200
      }ms`,
      ...(open && {
        opacity: 1,
        transform: 'scale(1)'
      })
    },

    ...(open
      ? {
          height: '100vh'
        }
      : {
          height: 0,
          overflow: 'hidden'
        })
  })
)

const MobileMenu = ({
  testId = 'mobile-menu',
  open = false,
  color = 'secondary',
  items = [],
  header,
  footer,
  onToggle
}: MobileMenuProps) => {
  const headerProps = getProps('ResponsiveHeader')
  const menu = useSlidingMenu(items)

  const swipeHandlers = useSwipeable({
    onSwipedUp: () => {
      if (onToggle) onToggle()
    }
  })

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
  }, [open])

  return (
    <StlyedMobileMenu
      data-testid={testId}
      open={open}
      color={color}
      headerHeight={headerProps.heightSm}
      className='MobileMenu-root'
      {...swipeHandlers}
    >
      <Box className='MobileMenu-header' />
      <Box className='MobileMenu-content'>
        <Box>
          {header && <Box>{header}</Box>}
          <Box display='flex'>
            <SlidingMenu
              items={menu.items}
              activeIndex={menu.activeIndex}
              onInit={menu.onInit}
              onItemClick={menu.onItemClick}
              onBackClick={menu.onBackClick}
              secondLevel={menu.secondLevel}
              thirdLevel={menu.thirdLevel}
            />
          </Box>
        </Box>
        {footer && <Box>{footer}</Box>}
      </Box>
    </StlyedMobileMenu>
  )
}

export default MobileMenu
