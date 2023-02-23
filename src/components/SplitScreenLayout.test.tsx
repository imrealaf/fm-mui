import * as React from 'react'
import { render, waitFor } from '@testing-library/react'

import config from '../config'
import { ThemeProvider, createTheme } from '@mui/material'
import SplitScreenLayout, { SplitScreenLayoutProps } from './SplitScreenLayout'

const testId = 'test-SplitScreenLayout'

const defaultProps: SplitScreenLayoutProps = {
  testId,
  contentLeft: <div>left</div>,
  contentRight: <div>right</div>
}

const renderComponent = (props?: Partial<SplitScreenLayoutProps>) => {
  const finalProps = { ...defaultProps, ...props }
  return render(
    <ThemeProvider theme={createTheme()}>
      <SplitScreenLayout {...finalProps} />
    </ThemeProvider>
  )
}

it('renders without crashing', async () => {
  const { container, getByTestId } = renderComponent({
    testId
  })
  expect(container).toBeTruthy()
  expect(getByTestId(testId)).toBeTruthy()
  expect(getComputedStyle(getByTestId(testId)).height).toBe('100vh')
})

it('renders auto height when fullHeight is false', async () => {
  const { getByTestId } = renderComponent({
    testId,
    fullHeight: false
  })
  expect(getComputedStyle(getByTestId(testId)).height).toBe('auto')
})

it('renders proper col width if right hidden', async () => {
  const { getByTestId } = renderComponent({
    testId,
    hideRight: true
  })
  expect(
    getByTestId(`${testId}-left-content`).classList.contains(
      'MuiGrid-grid-xs-12'
    )
  ).toBe(true)
})

it('renders proper col width if left hidden', async () => {
  const { getByTestId } = renderComponent({
    testId,
    hideLeft: true
  })
  expect(
    getByTestId(`${testId}-right-content`).classList.contains(
      'MuiGrid-grid-xs-12'
    )
  ).toBe(true)
})
