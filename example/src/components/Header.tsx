import React from 'react'
import { IconButton, Menu, MenuItem } from '@mui/material'
import AccountCircleIcon from '@mui/icons-material/AccountCircle'
import SearchIcon from '@mui/icons-material/Search'
import {
  ResponsiveHeader,
  useToggle,
  useToggleByAnchor,
  SearchDrawer,
  MenuItemRecord
} from 'fm-mui'
import { useSearch } from '../hooks'

export interface HeaderProps {
  items?: MenuItemRecord[]
  mobileMenuItems?: MenuItemRecord[]
}

const Header = ({ items = [], mobileMenuItems = [] }: HeaderProps) => {
  const { searchValue, clearSearch, submitSearch, onSearchChange } = useSearch()
  const mobileMenu = useToggle()
  const search = useToggle()
  const userMenu = useToggleByAnchor()
  const actions = (
    <>
      <IconButton size='large' color='inherit' onClick={search.show}>
        <SearchIcon />
      </IconButton>
      <IconButton size='large' onClick={userMenu.show} color='inherit'>
        <AccountCircleIcon />
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
          Profile
        </MenuItem>
        <MenuItem onClick={userMenu.hide} sx={{ minHeight: 'auto' }}>
          My account
        </MenuItem>
      </Menu>
    </>
  )

  const handleSearchClose = () => {
    search.hide()
    clearSearch()
  }

  return (
    <>
      <SearchDrawer
        open={search.open}
        value={searchValue}
        onClose={handleSearchClose}
        onChanged={onSearchChange}
        onClear={clearSearch}
        onSubmit={submitSearch}
      />
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

export default Header
