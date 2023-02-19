import React from 'react'
import { IconButton, Menu, MenuItem, Avatar } from '@mui/material'
import LogoutIcon from '@mui/icons-material/Logout'
import ManageAccountsIcon from '@mui/icons-material/ManageAccounts'
import SettingsIcon from '@mui/icons-material/Settings'
import {
  ResponsiveHeader,
  useToggle,
  useToggleByAnchor,
  MenuItemRecord
} from 'fm-mui'
import { useUser } from '../hooks'

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
  const { getInitials } = useUser()
  const actions = (
    <>
      <IconButton size='large' onClick={userMenu.show} color='inherit'>
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
        <MenuItem onClick={userMenu.hide} sx={{ minHeight: 'auto' }}>
          <ManageAccountsIcon fontSize='small' sx={{ mr: 1 }} />
          My Account
        </MenuItem>
        <MenuItem onClick={userMenu.hide} sx={{ minHeight: 'auto' }}>
          <SettingsIcon fontSize='small' sx={{ mr: 1 }} />
          Settings
        </MenuItem>
        <MenuItem onClick={userMenu.hide} sx={{ minHeight: 'auto' }}>
          <LogoutIcon fontSize='small' sx={{ mr: 1 }} />
          Sign Out
        </MenuItem>
      </Menu>
    </>
  )

  return (
    <>
      <ResponsiveHeader
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
