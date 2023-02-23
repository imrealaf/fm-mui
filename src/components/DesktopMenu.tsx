import React from 'react'
import { Box, Link, Menu, Fade, styled, MenuItem } from '@mui/material'
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown'
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp'

import { hasChildItems } from '../utils'
import { MenuItemRecord } from '../types'
import { useToggleByAnchor } from '../hooks'
import clsx from 'clsx'

export interface DesktopMenuProps {
  testId?: string
  items: MenuItemRecord[]
}

const StyledDesktopMenu = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  marginRight: theme.spacing(1),

  '.DesktopMenuLink-root': {
    padding: `${theme.spacing(0.5)} ${theme.spacing(1)}`,
    textDecoration: 'none',
    borderTop: '2px solid transparent',
    borderBottom: '2px solid transparent',
    transition: 'all .2s ease',
    cursor: 'pointer',
    display: 'inline-flex',
    alignItems: 'center',

    '&.DesktopMenuLink-toggle': {
      paddingRight: theme.spacing(0.4)
    },

    '&:hover:not(.DesktopMenuLink-active)': {
      borderBottomColor: theme.palette.common.white
    }
  },

  '.DesktopMenuLink-active': {
    fontWeight: 700,
    '&:not(.DesktopMenuLink-toggle)': {
      cursor: 'default'
    }
  }
}))

const StyledDropdown = styled(Menu)(({ theme }) => ({
  '.DesktopMenuDropdown-root': {
    '.DesktopMenuDropdownLink-root': {
      borderTop: '2px solid transparent',
      borderBottom: '2px solid transparent',
      textDecoration: 'none',
      padding: `${theme.spacing(0.5)} ${theme.spacing(1)}`,
      transition: 'all .2s ease',
      cursor: 'pointer',
      display: 'inline-flex',
      alignItems: 'center',

      '&.DesktopMenuDropdownLink-toggle': {
        paddingRight: theme.spacing(0.4)
      },

      '&:hover:not(.DesktopMenuDropdownLink-active)': {
        borderBottomColor: theme.palette.text.primary
      }
    }
  }
}))

const DesktopMenu = ({ testId = 'desktop-menu', items }: DesktopMenuProps) => {
  return (
    <StyledDesktopMenu data-testid={testId} className='DesktopMenu-root'>
      {items &&
        items.length &&
        items.map((item) => {
          const dd = useToggleByAnchor()
          const linkProps = hasChildItems(item)
            ? {
                onClick: dd.show
              }
            : {}
          return [
            [
              <Link
                key={item.title}
                color='inherit'
                className={clsx('DesktopMenuLink-root', {
                  'DesktopMenuLink-toggle': hasChildItems(item),
                  'DesktopMenuLink-active': item.active
                })}
                {...linkProps}
              >
                {item.title}
                {hasChildItems(item) && (
                  <Box display='inline-flex' className='DesktopMenuLink-icon'>
                    {dd.open ? (
                      <KeyboardArrowUpIcon data-testid={`${testId}-icon-up`} />
                    ) : (
                      <KeyboardArrowDownIcon
                        data-testid={`${testId}-icon-down`}
                      />
                    )}
                  </Box>
                )}
              </Link>
            ],
            [
              hasChildItems(item) && (
                <StyledDropdown
                  key={item.title}
                  open={dd.open}
                  anchorEl={dd.anchorEl}
                  onClose={dd.hide}
                  TransitionComponent={Fade}
                  PaperProps={{
                    className: 'DesktopMenuDropdown-root',
                    sx: {
                      px: 2,
                      py: 1
                    }
                  }}
                >
                  {item.childItems?.map((childItem) => {
                    const level2dd = useToggleByAnchor()
                    const childLinkProps = hasChildItems(childItem)
                      ? {
                          onClick: level2dd.show
                        }
                      : {}
                    return [
                      [
                        <Link
                          key={childItem.title}
                          {...childLinkProps}
                          className={clsx('DesktopMenuDropdownLink-root', {
                            'DesktopMenuDropdownLink-toggle':
                              hasChildItems(childItem),
                            'DesktopMenuDropdownLink-active': childItem.active
                          })}
                          color='inherit'
                          sx={{ px: 1 }}
                        >
                          {childItem.title}
                          {hasChildItems(childItem) && (
                            <Box
                              display='inline-flex'
                              className='DesktopMenuDropdownLink-icon'
                            >
                              {level2dd.open ? (
                                <KeyboardArrowUpIcon />
                              ) : (
                                <KeyboardArrowDownIcon />
                              )}
                            </Box>
                          )}
                        </Link>
                      ],
                      [
                        hasChildItems(childItem) && (
                          <Menu
                            key={childItem.title}
                            open={level2dd.open}
                            anchorEl={level2dd.anchorEl}
                            onClose={level2dd.hide}
                          >
                            {childItem.childItems?.map((subChildItem) => (
                              <MenuItem key={subChildItem.title}>
                                {subChildItem.title}
                              </MenuItem>
                            ))}
                          </Menu>
                        )
                      ]
                    ]
                  })}
                </StyledDropdown>
              )
            ]
          ]
        })}
    </StyledDesktopMenu>
  )
}

export default DesktopMenu
