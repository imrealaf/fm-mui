import React from 'react'
import { Box } from '@mui/material'
import { ComponentStory, ComponentMeta } from '@storybook/react'

import menuItems from 'data/menuItems'
import MobileMenu from 'components/MobileMenu'

export default {
  title: 'Offcanvas/MobileMenu',
  component: MobileMenu,
  parameters: {
    layout: 'fullscreen'
  }
} as ComponentMeta<typeof MobileMenu>

const Template: ComponentStory<typeof MobileMenu> = (args) => {
  return (
    <Box sx={{ height: 2000 }}>
      <MobileMenu {...args} />
    </Box>
  )
}

export const Default = Template.bind({})
Default.args = {
  open: true,
  items: menuItems,
  menuFooter: <Box>This is a footer</Box>
}
