import React from 'react'
import {
  Box,
  List,
  ListItemIcon,
  ListItemButton,
  ListItemText,
  styled,
  TypographyProps,
  SvgIcon,
  SvgIconProps,
  Collapse
} from '@mui/material'
import ExpandLessIcon from '@mui/icons-material/ExpandLess'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import clsx from 'clsx'

import { hasChildItems } from 'utils'
import { MenuItemRecord } from 'types'
import { useToggle } from 'hooks'

export interface CollapsingMenuProps {
  testId?: string
  variant?: 'default' | 'lined'
  items?: MenuItemRecord[]
  itemIconProps?: SvgIconProps
  itemTypographyProps?: TypographyProps
  activeItemTypographyProps?: TypographyProps
  activeItemClass?: string
  lessIcon?: typeof SvgIcon
  lessIconProps?: SvgIconProps
  moreIcon?: typeof SvgIcon
  moreIconProps?: SvgIconProps
}

const StyledCollapsingMenu = styled(Box, {
  // shouldForwardProp: (prop) => prop !== 'drawerWidth'
})<Partial<CollapsingMenuProps>>(({ theme, variant }) => ({
  '.MuiListItemIcon-root': {
    minWidth: theme.spacing(4.5)
  },
  '.CollapsingMenuItem-root': {
    ...(variant === 'lined' && {
      borderTop: `1px solid ${theme.palette.divider}`,
      '&:first-of-type': {
        borderTop: 'none'
      }
    })
  },
  '.CollapsingMenuChildItem-root': {
    paddingLeft: theme.spacing(4)
  }
}))

const CollapsingMenu = ({
  testId = 'collapsing-menu',
  variant = 'default',
  items = [],
  activeItemClass,
  itemIconProps,
  itemTypographyProps,
  activeItemTypographyProps,
  lessIcon = ExpandLessIcon,
  moreIcon = ExpandMoreIcon,
  lessIconProps,
  moreIconProps
}: CollapsingMenuProps) => {
  return (
    <StyledCollapsingMenu
      className='CollapsingMenu-root'
      data-testid={testId}
      variant={variant}
    >
      <List disablePadding>
        {items.map((item: MenuItemRecord) => {
          const dd = useToggle(item.active)
          const itemProps = hasChildItems(item)
            ? {
                onClick: dd.toggle
              }
            : {}
          return [
            [
              <ListItemButton
                data-testid={`${testId}-menu-item`}
                key={item.title}
                className={clsx(
                  'CollapsingMenuItem-root',
                  {
                    'CollapsingMenuItem-toggle': hasChildItems(item),
                    'CollapsingMenuItem-active': item.active
                  },
                  item.active && activeItemClass ? activeItemClass : ''
                )}
                {...itemProps}
              >
                {item.icon && (
                  <ListItemIcon data-testid={`${testId}-menu-item-icon`}>
                    {React.createElement(item.icon, itemIconProps)}
                  </ListItemIcon>
                )}
                <ListItemText
                  primary={item.title}
                  primaryTypographyProps={
                    item.active
                      ? { ...itemTypographyProps, ...activeItemTypographyProps }
                      : itemTypographyProps
                  }
                />
                {hasChildItems(item)
                  ? dd.open
                    ? React.createElement(lessIcon, lessIconProps)
                    : React.createElement(moreIcon, moreIconProps)
                  : null}
              </ListItemButton>
            ],
            [
              hasChildItems(item) && (
                <Collapse in={dd.open} key={item.title}>
                  <List component='div' disablePadding>
                    {item.childItems?.map((childItem) => (
                      <ListItemButton
                        key={childItem.title}
                        data-testid={`${testId}-menu-child-item`}
                        className={clsx('CollapsingMenuChildItem-root', {
                          'CollapsingMenuChildItem-active': childItem.active
                        })}
                      >
                        {childItem.icon && (
                          <ListItemIcon
                            data-testid={`${testId}-menu-child-item-icon`}
                          >
                            {React.createElement(childItem.icon, itemIconProps)}
                          </ListItemIcon>
                        )}
                        <ListItemText
                          primary={childItem.title}
                          primaryTypographyProps={
                            childItem.active
                              ? {
                                  ...itemTypographyProps,
                                  ...activeItemTypographyProps
                                }
                              : itemTypographyProps
                          }
                        />
                      </ListItemButton>
                    ))}
                  </List>
                </Collapse>
              )
            ]
          ]
        })}
      </List>
    </StyledCollapsingMenu>
  )
}

export default CollapsingMenu
