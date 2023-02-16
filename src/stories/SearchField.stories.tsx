import React, { useState } from 'react'
import { ComponentStory, ComponentMeta } from '@storybook/react'
import SearchField from '../components/SearchField'

export default {
  title: 'Custom/Inputs/SearchField',
  component: SearchField,
  parameters: {},
  argsTypes: {
    size: {
      control: 'radio',
      options: ['small', 'medium']
    }
  }
} as ComponentMeta<typeof SearchField>

const Template: ComponentStory<typeof SearchField> = (args) => {
  const [value, setValue] = useState('')
  const handleClear = () => {
    setValue('')
  }
  return (
    <SearchField
      {...args}
      value={value}
      onChange={(e) => setValue(e.target.value)}
      onClear={handleClear}
      sx={{ width: 300 }}
    />
  )
}

export const Default = Template.bind({})
Default.args = {
  onSubmit: () => alert('Submit search')
}

export const Small = Template.bind({})
Small.args = {
  onSubmit: () => alert('Submit search'),
  size: 'small'
}
