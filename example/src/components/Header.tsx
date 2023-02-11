import React from 'react'
import { IconButton, Menu, MenuItem } from '@mui/material'
import AccountCircleIcon from '@mui/icons-material/AccountCircle'
import SearchIcon from '@mui/icons-material/Search'
import {
  ResponsiveHeader,
  useToggle,
  useToggleByAnchor,
  SearchDialog
} from 'fm-mui'

import { useSearch } from '../hooks'

const menuItems = [
  {
    title: 'About'
  }
]

const Header = () => {
  const { searchValue, clearSearch, submitSearch, onSearchChange } = useSearch()
  const mobileMenu = useToggle()
  const searchDialog = useToggle()
  const userMenu = useToggleByAnchor()
  const actions = (
    <>
      <IconButton size='large' color='inherit' onClick={searchDialog.show}>
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
    searchDialog.hide()
    clearSearch()
  }

  return (
    <>
      <SearchDialog
        open={searchDialog.open}
        value={searchValue}
        onClose={handleSearchClose}
        onChange={onSearchChange}
        onClear={clearSearch}
        onSubmit={submitSearch}
      />
      <ResponsiveHeader
        open={mobileMenu.open}
        menuItems={menuItems}
        onToggle={mobileMenu.toggle}
        actions={actions}
      />
    </>
  )
}

export default Header
