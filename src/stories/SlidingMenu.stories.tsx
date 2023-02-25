import React from 'react'
import { ComponentStory, ComponentMeta } from '@storybook/react'
import { Box, Button } from '@mui/material'
import { BrowserRouter } from 'react-router-dom'

import menuItems from 'data/routerMenuItems'
import { useSlidingMenu, useToggle } from 'hooks'
import Drawer from 'components/Drawer'
import SlidingMenu from 'components/SlidingMenu'

export default {
  title: 'Navigation/SlidingMenu',
  component: SlidingMenu,
  parameters: {
    layout: 'fullscreen'
  }
} as ComponentMeta<typeof SlidingMenu>

const Template: ComponentStory<typeof SlidingMenu> = (args) => {
  const menu = useSlidingMenu(menuItems)
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

const RouterTemplate: ComponentStory<typeof SlidingMenu> = (args) => {
  const menu = useSlidingMenu(menuItems)
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
      <BrowserRouter>
        <SlidingMenu
          {...args}
          router
          items={menu.items}
          activeIndex={menu.activeIndex}
          onInit={menu.onInit}
          onItemClick={menu.onItemClick}
          onBackClick={menu.onBackClick}
          secondLevel={menu.secondLevel}
          thirdLevel={menu.thirdLevel}
        />
      </BrowserRouter>
    </Box>
  )
}

const DrawerTemplate: ComponentStory<typeof SlidingMenu> = (args) => {
  const menu = useSlidingMenu(menuItems)
  const drawer = useToggle()
  return (
    <Box>
      <Button onClick={drawer.show}>Toggle Menu</Button>
      <Drawer open={drawer.open} onClose={drawer.hide}>
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
      </Drawer>
    </Box>
  )
}

export const Default = Template.bind({})
Default.args = {}

export const UsingRouter = RouterTemplate.bind({})
UsingRouter.args = {}

export const DrawerExample = DrawerTemplate.bind({})
DrawerExample.args = {}
