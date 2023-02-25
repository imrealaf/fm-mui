import * as React from 'react'
import { render, fireEvent, waitFor } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'

import { ThemeProvider, createTheme } from '@mui/material'
import SearchDrawer, { SearchDrawerProps } from './SearchDrawer'

const testId = 'test-SearchDrawer'

const defaultProps: SearchDrawerProps = {
  open: true,
  onClose: jest.fn()
}

const renderComponent = (props?: Partial<SearchDrawerProps>) => {
  const finalProps = { ...defaultProps, ...props }
  return render(
    <ThemeProvider theme={createTheme()}>
      <SearchDrawer {...finalProps} />
    </ThemeProvider>
  )
}

it('renders without crashing', async () => {
  const { container, getByTestId } = renderComponent()
  expect(container).toBeTruthy()
  expect(getByTestId('search-drawer')).toBeTruthy()
})

it('renders test id', async () => {
  const { getByTestId } = renderComponent({
    testId
  })
  expect(getByTestId(testId)).toBeTruthy()
})

it('changes icon size on mobile', async () => {
  const { container } = renderComponent({
    testId
  })

  const icon = container.querySelector('.MuiInputBase-root .MuiSvgIcon-root')

  if (icon) {
    const size = getComputedStyle(icon).fontSize

    global.innerWidth = 500

    fireEvent.resize(window)

    waitFor(() => {
      expect(getComputedStyle(icon).fontSize).not.toBe(size)
    })
  }
})
