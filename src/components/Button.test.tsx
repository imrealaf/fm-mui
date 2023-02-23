import * as React from 'react'
import { render } from '@testing-library/react'

import { ThemeProvider, createTheme } from '@mui/material'
import Button, { ButtonProps } from './Button'

const testId = 'test-button'

const defaultProps: ButtonProps = {
  testId
}

const renderComponent = (props?: Partial<ButtonProps>) => {
  const finalProps = { ...defaultProps, ...props }
  return render(
    <ThemeProvider theme={createTheme()}>
      <Button {...finalProps} />
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

it('renders pill variant', async () => {
  const { getByTestId } = renderComponent({
    testId,
    pill: true
  })
  expect(getComputedStyle(getByTestId(testId)).borderRadius).toBe('30px')
})
