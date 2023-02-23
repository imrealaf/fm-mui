import * as React from 'react'
import { render } from '@testing-library/react'

import { ThemeProvider, createTheme } from '@mui/material'
import Accordion, { AccordionProps } from './Accordion'

const testId = 'test-Accordion'

const defaultProps: AccordionProps = {
  testId,
  id: 'panel-1',
  summary: 'Heading',
  children: 'content'
}

const renderComponent = (props?: Partial<AccordionProps>) => {
  const finalProps = { ...defaultProps, ...props }
  return render(
    <ThemeProvider theme={createTheme()}>
      <Accordion {...finalProps} />
    </ThemeProvider>
  )
}

it('renders without crashing', async () => {
  const { container, getByTestId } = renderComponent({
    testId
  })
  expect(container).toBeTruthy()
  expect(getByTestId(testId)).toBeTruthy()
})
