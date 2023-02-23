import * as React from 'react'
import { render } from '@testing-library/react'

import { ThemeProvider, createTheme } from '@mui/material'
import Dialog, { DialogProps } from './Dialog'

const testId = 'test-Dialog'

const defaultProps: DialogProps = {
  testId,
  open: true,
  onClose: jest.fn()
}

const renderComponent = (props?: Partial<DialogProps>) => {
  const finalProps = { ...defaultProps, ...props }
  return render(
    <ThemeProvider theme={createTheme()}>
      <Dialog {...finalProps} />
    </ThemeProvider>
  )
}

it('renders without crashing', async () => {
  const { container } = renderComponent({
    testId
  })
  expect(container).toBeTruthy()
})

it('renders close btn without title', async () => {
  const { getByTestId } = renderComponent({
    testId,
    showClose: true
  })
  const btn = getByTestId(`${testId}-close`)
  expect(btn).toBeTruthy()
  expect(getComputedStyle(btn).right).toBe('5px')
  expect(getComputedStyle(btn).top).toBe('5px')
})

it('renders title / close btn', async () => {
  const { getByTestId } = renderComponent({
    testId,
    title: 'Title',
    showClose: true
  })
  const btn = getByTestId(`${testId}-close`)
  const title = getByTestId(`${testId}-title`)
  expect(btn).toBeTruthy()
  expect(title).toBeTruthy()
  expect(getComputedStyle(btn).right).toBe('10px')
  expect(getComputedStyle(btn).top).toBe('10px')
})

it('renders actions', async () => {
  const { getByTestId } = renderComponent({
    testId,
    actions: <div>actions</div>
  })
  const actions = getByTestId(`${testId}-actions`)
  expect(actions).toBeTruthy()
})
