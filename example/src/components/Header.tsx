import React from 'react'
import { IconButton } from '@mui/material'
import SearchIcon from '@mui/icons-material/Search'
import {
  ResponsiveHeader,
  useToggle,
  SearchDrawer,
  MenuItemRecord,
  Button
} from 'fm-mui'

import Logo from './Logo'
import UnstyledRouterLink from './UnstyledRouterLink'
import { useSearch } from 'hooks'
import { SIGN_IN_ROUTE } from 'routes/paths'

export interface HeaderProps {
  items?: MenuItemRecord[]
  mobileMenuItems?: MenuItemRecord[]
}

const Header = ({ items = [], mobileMenuItems = [] }: HeaderProps) => {
  const { searchValue, clearSearch, submitSearch, onSearchChange } = useSearch()
  const mobileMenu = useToggle()
  const search = useToggle()
  const actions = (
    <>
      <IconButton size='large' color='inherit' onClick={search.show}>
        <SearchIcon />
      </IconButton>
      <UnstyledRouterLink to={SIGN_IN_ROUTE}>
        <Button pill color='white' variant='outlined'>
          Sign in
        </Button>
      </UnstyledRouterLink>
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
        brand={<Logo />}
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
