import React from 'react'
import { ComponentStory, ComponentMeta } from '@storybook/react'
import { Box, TextField, Typography } from '@mui/material'

import Card from '../components/Card'
import Button from '../components/Button'
import SplitScreenLayout from '../components/SplitScreenLayout'
import { useBreakpoint } from '../hooks'

export default {
  title: 'Layout/SplitScreenLayout',
  component: SplitScreenLayout,
  parameters: {
    layout: 'fullscreen'
  },
  argsTypes: {
    // size: {
    //   control: 'radio',
    //   options: ['small', 'medium']
    // }
  }
} as ComponentMeta<typeof SplitScreenLayout>

const Template: ComponentStory<typeof SplitScreenLayout> = (args) => {
  const bp = useBreakpoint()
  return (
    <SplitScreenLayout
      {...args}
      contentLeft={
        <Box>
          <Typography color='common.white'>Left Content</Typography>
        </Box>
      }
      contentLeftProps={{
        sx: {
          bgcolor: 'primary.main'
        }
      }}
      contentRight={
        <Box
          sx={{
            width: bp.mdAndUp ? 300 : 270
          }}
        >
          <Typography textAlign='center' mb={2} variant='h5'>
            Login
          </Typography>
          <Card>
            <Box mb={2}>
              <TextField variant='standard' fullWidth placeholder='Email' />
            </Box>
            <Box mb={2}>
              <TextField
                variant='standard'
                fullWidth
                placeholder='Password'
                type='password'
              />
            </Box>
            <Box textAlign='center'>
              <Button pill variant='contained' disableElevation>
                Sign In
              </Button>
            </Box>
          </Card>
        </Box>
      }
      hideLeft={bp.smAndDown}
    />
  )
}

export const Default = Template.bind({})
Default.args = {}
