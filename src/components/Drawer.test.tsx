import * as React from 'react'
import { render } from '@testing-library/react'

import config from '../config'
import { ThemeProvider, createTheme } from '@mui/material'
import Drawer, { DrawerProps } from './Drawer'

const testId = 'test-Drawer'

const defaultProps: DrawerProps = {
  testId,
  open: true,
  onClose: jest.fn()
}

const renderComponent = (props?: Partial<DrawerProps>) => {
  const finalProps = { ...defaultProps, ...props }
  return render(
    <ThemeProvider theme={createTheme()}>
      <Drawer {...finalProps} />
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

it('renders proper width', async () => {
  const { container, getByTestId } = renderComponent({
    testId
  })
  const drawer = getByTestId(testId)
  const paper = drawer.querySelector('.MuiDrawer-paper')
  expect(getComputedStyle(drawer).width).toBe(`${config.global.drawerWidth}px`)
  if (paper) {
    expect(getComputedStyle(paper).width).toBe(`${config.global.drawerWidth}px`)
  }
})

it('renders permanent zindex', async () => {
  const { getByTestId } = renderComponent({
    testId,
    variant: 'permanent'
  })
  const drawer = getByTestId(testId)
  const paper = drawer.querySelector('.MuiDrawer-paper')
  if (paper) {
    expect(getComputedStyle(paper).zIndex).toBe('1200')
  }
})

it('renders top variant properly', async () => {
  const { getByTestId } = renderComponent({
    testId,
    anchor: 'top'
  })
  const drawer = getByTestId(testId)
  expect(getComputedStyle(drawer).width).toBe('')
  const paper = drawer.querySelector('.MuiDrawer-paper')
  if (paper) {
    expect(getComputedStyle(paper).width).toBe('')
  }
})
