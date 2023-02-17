import React, { useState } from 'react'
import { ComponentStory, ComponentMeta } from '@storybook/react'
import Button from '../components/Button'

export default {
  title: 'Extended/Button',
  component: Button,
  parameters: {},
  argsTypes: {
    pill: {
      control: null
    }
  }
} as ComponentMeta<typeof Button>

const Template: ComponentStory<typeof Button> = (args) => {
  return (
    <Button {...args} pill={true}>
      Button
    </Button>
  )
}

export const Pill = Template.bind({})
Pill.args = {
  pill: true
}
