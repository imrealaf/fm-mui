import React, { useState } from 'react'
import { ComponentStory, ComponentMeta } from '@storybook/react'

import {
  TextField,
  Select,
  MenuItem,
  FormControl,
  InputLabel
} from '@mui/material'

import {
  handleTextChange,
  handlePhoneChange,
  handleEnterKey,
  handleSelectChange
} from 'utils'

export default {
  title: 'Utilities/Event Handlers',
  component: TextField,
  subcomponents: {
    Select
  },
  parameters: {}
} as ComponentMeta<typeof TextField>

const TextExample: ComponentStory<typeof TextField> = (args) => {
  const [value, setValue] = useState('')

  return (
    <TextField
      {...args}
      value={value}
      onChange={(e) =>
        handleTextChange(e, (data) => {
          setValue(data.value)
        })
      }
    />
  )
}

const PhoneExample: ComponentStory<typeof TextField> = (args) => {
  const [value, setValue] = useState('')

  return (
    <TextField
      {...args}
      value={value}
      onChange={(e) =>
        handlePhoneChange(e, (data) => {
          setValue(data.value)
        })
      }
    />
  )
}

const EnterKeyExample: ComponentStory<typeof TextField> = (args) => {
  const [value, setValue] = useState('')

  return (
    <TextField
      {...args}
      value={value}
      onChange={(e) =>
        handleTextChange(e, (data) => {
          setValue(data.value)
        })
      }
      onKeyDown={(e) => handleEnterKey(e, () => alert('Enter key pressed'))}
    />
  )
}

const SelectExample: ComponentStory<typeof Select> = (args) => {
  const [value, setValue] = useState('')

  const items = ['Item 1', 'Item 2']

  return (
    <FormControl fullWidth sx={{ width: 250 }}>
      <InputLabel>Select Change</InputLabel>
      <Select
        {...args}
        label='Select Change'
        value={value}
        onChange={(e) =>
          handleSelectChange(e, (data) => {
            setValue(data.value)
          })
        }
      >
        {items.map((item) => (
          <MenuItem key={item} value={item}>
            {item}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  )
}

export const TextChange = TextExample.bind({})
TextChange.args = {
  label: 'Text Input'
}

export const PhoneNumberChange = PhoneExample.bind({})
PhoneNumberChange.args = {
  label: 'Phone Number Input'
}

export const EnterKeyDown = EnterKeyExample.bind({})
EnterKeyDown.args = {
  label: 'Enter Key Down'
}

export const SelectChange = SelectExample.bind({})
SelectChange.args = {}
