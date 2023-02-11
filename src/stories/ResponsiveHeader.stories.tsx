import React, { useState } from 'react'
import { Box, IconButton, Menu, MenuItem } from '@mui/material'
import AccountCircleIcon from '@mui/icons-material/AccountCircle'
import SearchIcon from '@mui/icons-material/Search'
import { ComponentStory, ComponentMeta } from '@storybook/react'

import SearchField from '../components/SearchField'
import { MenuItemRecord } from '../types'
import ResponsiveHeader from '../components/ResponsiveHeader'
import { useToggle, useToggleByAnchor } from '../hooks'

const menuItems: MenuItemRecord[] = [
  {
    title: 'Item 1'
  },
  {
    title: 'Item 2',
    childItems: [
      {
        title: 'Sub item 1'
      },
      {
        title: 'Sub item 2',
        childItems: [
          {
            title: 'Third item 1'
          },
          {
            title: 'Third item 2'
          }
        ]
      }
    ]
  }
]

export default {
  title: 'Components/ResponsiveHeader',
  component: ResponsiveHeader,
  parameters: {
    layout: 'fullscreen'
  }
} as ComponentMeta<typeof ResponsiveHeader>

const Template: ComponentStory<typeof ResponsiveHeader> = (args) => {
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
  return (
    <Box sx={{ height: 2000 }}>
      <ResponsiveHeader
        {...args}
        open={menu.open}
        onToggle={menu.toggle}
        actions={actions}
      />
    </Box>
  )
}

export const Default = Template.bind({})
Default.args = {
  menuItems,
  menuFooter: <Box>This is a footer</Box>
}
