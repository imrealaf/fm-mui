import React from 'react'
import { Menu, MenuItem, Avatar, IconButton } from '@mui/material'
import LogoutIcon from '@mui/icons-material/Logout'
import {
  ResponsiveHeader,
  useToggle,
  useToggleByAnchor,
  MenuItemRecord
} from 'fm-mui'
import { useNavigate } from 'react-router-dom'

import Logo from './Logo'
import { useAuth, useUser } from 'hooks'
import { userMenuItems } from 'menus'

export interface PrivateHeaderProps {
  items?: MenuItemRecord[]
  mobileMenuItems?: MenuItemRecord[]
}

const PrivateHeader = ({
  items = [],
  mobileMenuItems = []
}: PrivateHeaderProps) => {
  const mobileMenu = useToggle()
  const userMenu = useToggleByAnchor()
  const { signOut } = useAuth()
  const { getInitials } = useUser()
  const navigate = useNavigate()

  const onUserMenuItemClick = (item: MenuItemRecord) => {
    userMenu.hide()
    navigate(item.url as string)
  }

  const actions = (
    <>
      <IconButton onClick={userMenu.show}>
        <Avatar sx={{ width: 40, height: 40 }}>{getInitials()}</Avatar>
      </IconButton>
      <Menu
        id='menu-appbar'
        anchorEl={userMenu.anchorEl}
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'right'
        }}
        keepMounted
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right'
        }}
        open={userMenu.open}
        onClose={userMenu.hide}
      >
        {userMenuItems.map((item: MenuItemRecord) => (
          <MenuItem
            key={item.title}
            onClick={() => onUserMenuItemClick(item)}
            sx={{ minHeight: 'auto' }}
          >
            {item.icon &&
              React.createElement(item.icon, {
                fontSize: 'small',
                sx: {
                  mr: 1
                }
              })}
            {item.title}
          </MenuItem>
        ))}
        <MenuItem onClick={signOut} sx={{ minHeight: 'auto' }}>
          <LogoutIcon fontSize='small' sx={{ mr: 1 }} />
          Sign Out
        </MenuItem>
      </Menu>
    </>
  )

  return (
    <>
      <ResponsiveHeader
        brand={<Logo color='white' />}
        open={mobileMenu.open}
        menuItems={items}
        mobileMenuItems={mobileMenuItems}
        onToggle={mobileMenu.toggle}
        actions={actions}
      />
    </>
  )
}

export default PrivateHeader
