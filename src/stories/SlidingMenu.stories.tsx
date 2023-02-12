import React, { useState } from 'react'
import { ComponentStory, ComponentMeta } from '@storybook/react'

import menuItems from './data/menuItems'
import { useSlidingMenu } from '../hooks'
import SlidingMenu from '../components/SlidingMenu'
import { Box } from '@mui/material'

export default {
  title: 'Components/Custom/SlidingMenu',
  component: SlidingMenu,
  parameters: {
    layout: 'fullscreen'
  }
} as ComponentMeta<typeof SlidingMenu>

const Template: ComponentStory<typeof SlidingMenu> = (args) => {
  const menu = useSlidingMenu(menuItems)
  return (
    <Box sx={{ maxWidth: 300, height: '100vh', borderRight: '1px solid #eee' }}>
      <SlidingMenu
        {...args}
        items={menu.items}
        activeIndex={menu.activeIndex}
        onInit={menu.onInit}
        onItemClick={menu.onItemClick}
        onBackClick={menu.onBackClick}
        secondLevel={menu.secondLevel}
        thirdLevel={menu.thirdLevel}
      />
    </Box>
  )
}

export const Default = Template.bind({})
Default.args = {}
