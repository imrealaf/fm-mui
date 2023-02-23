import * as React from 'react'
import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import '@testing-library/jest-dom/extend-expect'

// import { useStateMock } from '../test-utils'
import menuItems from '../data/menuItems'
import { ThemeProvider, createTheme } from '@mui/material'
import DesktopMenu, { DesktopMenuProps } from './DesktopMenu'

const testId = 'test-desktop-menu'

const defaultProps = {
  testId,
  items: menuItems
}

const renderComponent = (props?: Partial<DesktopMenuProps>) => {
  const finalProps = { ...defaultProps, ...props }
  return render(
    <ThemeProvider theme={createTheme()}>
      <DesktopMenu {...finalProps} />
    </ThemeProvider>
  )
}

it('renders without crashing', async () => {
  const { container } = renderComponent({
    testId
  })
  expect(container).toBeTruthy()
  expect(screen.getByTestId(testId)).toBeTruthy()
})

it('opens dropdown menu', async () => {
  const { container, getByTestId } = renderComponent({
    testId
  })
  const menuItems = container.querySelectorAll('.DesktopMenuLink-toggle')
  const item = menuItems[0]
  userEvent.click(item)
  waitFor(() => {
    const dropdown = item.querySelector('.DesktopMenuDropdown-root')
    expect(dropdown).toBeTruthy()
    expect(getByTestId(`${testId}-icon-up`)).toBeTruthy()
  })
})
