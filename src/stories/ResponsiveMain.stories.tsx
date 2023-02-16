import React, { useState } from 'react'
import { Box, Container, Typography } from '@mui/material'
import { ComponentStory, ComponentMeta } from '@storybook/react'

import Drawer from '../components/Drawer'
import ResponsiveHeader from '../components/ResponsiveHeader'
import ResponsiveMain from '../components/ResponsiveMain'

export default {
  title: 'Layout/ResponsiveMain',
  component: ResponsiveMain,
  parameters: {
    layout: 'fullscreen'
  }
} as ComponentMeta<typeof ResponsiveMain>

const Template: ComponentStory<typeof ResponsiveMain> = (args) => {
  return (
    <Box>
      <ResponsiveHeader />
      <ResponsiveMain {...args}>
        <Container
          sx={{
            p: 3
          }}
        >
          <Typography variant='h5'>Page Title</Typography>
        </Container>
      </ResponsiveMain>
    </Box>
  )
}

const DrawerTemplate: ComponentStory<typeof ResponsiveMain> = (args) => {
  const drawer = (
    <Drawer variant='permanent'>
      <Box p={3}>this is a drawer</Box>
    </Drawer>
  )

  return (
    <Box sx={{ height: 2000 }}>
      <ResponsiveHeader />
      <ResponsiveMain {...args} drawer={drawer}>
        <Container
          sx={{
            p: 3
          }}
        >
          <Typography variant='h5'>Page Title</Typography>
        </Container>
      </ResponsiveMain>
    </Box>
  )
}

const DrawerTemplateRight: ComponentStory<typeof ResponsiveMain> = (args) => {
  const drawer = (
    <Drawer variant='permanent' anchor='right'>
      <Box p={3}>this is a drawer</Box>
    </Drawer>
  )

  return (
    <Box>
      <ResponsiveHeader />
      <ResponsiveMain {...args} drawer={drawer} drawerPosition='right'>
        <Container
          sx={{
            p: 3
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

export const WithDrawer = DrawerTemplate.bind({})
WithDrawer.args = {}

export const WithDrawerOnRight = DrawerTemplateRight.bind({})
WithDrawerOnRight.args = {}
