import React, { useState } from 'react'
import {
  Box,
  IconButton,
  Menu,
  MenuItem,
  Container,
  Typography
} from '@mui/material'
import AccountCircleIcon from '@mui/icons-material/AccountCircle'
import SearchIcon from '@mui/icons-material/Search'
import { ComponentStory, ComponentMeta } from '@storybook/react'

import menuItems from '../data/menuItems'
import ResponsiveHeader from '../components/ResponsiveHeader'
import ResponsiveMain from '../components/ResponsiveMain'
import { useToggle, useToggleByAnchor } from '../hooks'

export default {
  title: 'Components/Custom/ResponsiveMain',
  component: ResponsiveMain,
  parameters: {
    layout: 'fullscreen'
  }
} as ComponentMeta<typeof ResponsiveMain>

const Template: ComponentStory<typeof ResponsiveMain> = (args) => {
  const menu = useToggle()
  const userMenu = useToggleByAnchor()
  const [value, setValue] = useState('')
  const actions = (
    <>
      <IconButton size='large' color='inherit'>
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

  //   const HeaderProps = {
  //     open: menu.open,
  //     menuItems,
  //     onToggle: menu.toggle,
  //     actions
  //   }

  return (
    <Box sx={{ height: 2000 }}>
      <ResponsiveHeader
        open={menu.open}
        onToggle={menu.toggle}
        menuItems={menuItems}
        actions={actions}
        hideOnScroll
      />
      <ResponsiveMain {...args}>
        <Container
          sx={{
            p: {
              xs: 3,
              md: 4
            }
          }}
        >
          <Typography variant='h5'>Page Title</Typography>
        </Container>
      </ResponsiveMain>
    </Box>
  )
}

export const Default = Template.bind({})
Default.args = {}
