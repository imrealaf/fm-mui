import React, { useState } from 'react'
import { ComponentStory, ComponentMeta } from '@storybook/react'
import SearchDialog from '../components/SearchDialog'
import { Box, Button } from '@mui/material'
import { useToggle } from '../hooks'

export default {
  title: 'Components/SearchDialog',
  component: SearchDialog,
  parameters: {}
} as ComponentMeta<typeof SearchDialog>

const Template: ComponentStory<typeof SearchDialog> = (args) => {
  return <SearchDialog {...args} />
}

const Example: ComponentStory<typeof SearchDialog> = (args) => {
  const dialog = useToggle()
  const [value, setValue] = useState('')
  const onClose = () => {
    dialog.hide()
    setValue('')
  }
  return (
    <Box>
      <Button onClick={dialog.show}>Toggle</Button>
      <SearchDialog
        {...args}
        open={dialog.open}
        value={value}
        onChange={({ value }) => setValue(value)}
        onClear={() => setValue('')}
        onClose={onClose}
      />
    </Box>
  )
}

export const Default = Template.bind({})
Default.args = {
  open: true
}

export const FullExample = Example.bind({})
FullExample.args = {}
