import React, { useState } from 'react'
import { ComponentStory, ComponentMeta } from '@storybook/react'
import Card from '../components/Card'
import { Typography } from '@mui/material'

export default {
  title: 'Extended/Card',
  component: Card,
  parameters: {},
  argsTypes: {}
} as ComponentMeta<typeof Card>

const Template: ComponentStory<typeof Card> = (args) => {
  return (
    <Card sx={{ width: 300 }} {...args}>
      <Typography variant='h5'>Card title</Typography>
      <Typography>Card text</Typography>
    </Card>
  )
}

export const Default = Template.bind({})
Default.args = {}

export const OutlinedElevation = Template.bind({})
OutlinedElevation.args = {
  variant: 'outlinedElevation'
}

export const Media = Template.bind({})
Media.args = {
  media: {
    component: 'img',
    image:
      'https://fjwp.s3.amazonaws.com/blog/wp-content/uploads/2019/11/02060940/Untitled-design-16.png'
  }
}
