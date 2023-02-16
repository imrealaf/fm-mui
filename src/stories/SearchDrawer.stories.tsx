import React, { useState } from 'react'
import { ComponentStory, ComponentMeta } from '@storybook/react'
import SearchDrawer from '../components/SearchDrawer'
import { Box, Button } from '@mui/material'

import { handleTextChange } from '../utils'
import { useToggle } from '../hooks'

export default {
  title: 'Custom/Offcanvas/SearchDrawer',
  component: SearchDrawer,
  parameters: {}
} as ComponentMeta<typeof SearchDrawer>

const Template: ComponentStory<typeof SearchDrawer> = (args) => {
  return <SearchDrawer {...args} />
}

const Example: ComponentStory<typeof SearchDrawer> = (args) => {
  const drawer = useToggle()
  const [value, setValue] = useState('')
  const onClose = () => {
    drawer.hide()
    setValue('')
  }
  return (
    <Box>
      <Button onClick={drawer.show}>Toggle</Button>
      <SearchDrawer
        {...args}
        open={drawer.open}
        value={value}
        onChange={(e) => setValue(e.target.value)}
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
