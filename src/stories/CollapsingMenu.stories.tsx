import React, { useState } from 'react'
import { ComponentStory, ComponentMeta } from '@storybook/react'
import { Box, Button } from '@mui/material'
import AccountCircleIcon from '@mui/icons-material/AccountCircle'

import { useToggle } from '../hooks'
import Drawer from '../components/Drawer'
import CollapsingMenu from '../components/CollapsingMenu'

const items = [
  {
    title: 'Menu Item',
    icon: AccountCircleIcon
  },
  {
    title: 'Another Menu Item',
    active: true,
    icon: AccountCircleIcon,
    childItems: [
      {
        title: 'Sub Menu Item'
      },
      {
        title: 'Another Sub Menu Item'
      }
    ]
  },
  {
    title: 'Some Other Menu Item'
  }
]

export default {
  title: 'Navigation/CollapsingMenu',
  component: CollapsingMenu,
  parameters: {
    layout: 'fullscreen'
  }
} as ComponentMeta<typeof CollapsingMenu>

const Template: ComponentStory<typeof CollapsingMenu> = (args) => {
  return (
    <Box
      sx={{
        width: {
          xs: '100%',
          sm: 300
        },
        height: '100vh',
        borderRight: '1px solid #eee'
      }}
    >
      <CollapsingMenu
        {...args}
        items={items}
        itemIconProps={{
          color: 'primary'
        }}
        activeItemTypographyProps={{
          fontWeight: 700
        }}
      />
    </Box>
  )
}

const DrawerTemplate: ComponentStory<typeof CollapsingMenu> = (args) => {
  const drawer = useToggle()
  return (
    <Box>
      <Button onClick={drawer.show}>Toggle Menu</Button>
      <Drawer open={drawer.open} onClose={drawer.hide}>
        <CollapsingMenu
          {...args}
          items={items}
          activeItemTypographyProps={{
            fontWeight: 700
          }}
        />
      </Drawer>
    </Box>
  )
}

export const Default = Template.bind({})
Default.args = {}

export const DrawerExample = DrawerTemplate.bind({})
DrawerExample.args = {}
