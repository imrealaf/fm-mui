import React from 'react'
import { ComponentStory, ComponentMeta } from '@storybook/react'
import { Box, Typography } from '@mui/material'

import Accordion from 'components/Accordion'
import { useAccordion } from 'hooks'

export default {
  title: 'Extended/Accordion',
  component: Accordion,
  parameters: {},
  argsTypes: {}
} as ComponentMeta<typeof Accordion>

const accordions = [
  {
    id: 'example-1',
    summary: <Typography>Lorem ipsum dolor sit amet</Typography>,
    content: (
      <Box>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla eleifend
        non nibh non ullamcorper. Proin eleifend sed ligula sed ultrices.
        Pellentesque vestibulum cursus orci ac imperdiet.
      </Box>
    )
  },
  {
    id: 'example-2',
    summary: <Typography>Suspendisse auctor ligula</Typography>,
    content: (
      <Box>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla eleifend
        non nibh non ullamcorper. Proin eleifend sed ligula sed ultrices.
        Pellentesque vestibulum cursus orci ac imperdiet.
      </Box>
    )
  }
]

const Template: ComponentStory<typeof Box> = (args) => {
  return (
    <Box>
      {accordions.map((item) => (
        <Accordion id={item.id} summary={item.summary}>
          {item.content}
        </Accordion>
      ))}
    </Box>
  )
}

const ControlledTemplate: ComponentStory<typeof Box> = (args) => {
  const { isExpanded, toggle } = useAccordion()
  return (
    <Box>
      {accordions.map((item) => (
        <Accordion
          expanded={isExpanded(item.id)}
          id={item.id}
          summary={item.summary}
          onChange={toggle(item.id)}
        >
          {item.content}
        </Accordion>
      ))}
    </Box>
  )
}

export const Default = Template.bind({})
Default.args = {}

export const Controlled = ControlledTemplate.bind({})
Controlled.args = {}
