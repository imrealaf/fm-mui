import React from 'react'
import { render, screen } from '@testing-library/react'
// import userEvent from '@testing-library/user-event'
import '@testing-library/jest-dom/extend-expect'

import items from '../data/menuItems'
import { ThemeProvider, createTheme } from '@mui/material'
import SlidingMenu, { SlidingMenuProps } from './SlidingMenu'

const testId = 'test-sliding-menu'

const defaultProps = {
  testId,
  items,
  onInit: jest.fn(),
  onItemClick: jest.fn(),
  onBackClick: jest.fn()
}

const renderComponent = (props?: Partial<SlidingMenuProps>) => {
  const finalProps = { ...defaultProps, ...props }
  return render(
    <ThemeProvider theme={createTheme()}>
      <SlidingMenu {...finalProps} />
    </ThemeProvider>
  )
}

it('renders test ids', async () => {
  const { container } = renderComponent({
    testId
  })
  expect(container).toBeTruthy()
  expect(screen.getByTestId(testId)).toBeTruthy()
})
