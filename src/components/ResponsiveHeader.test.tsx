import * as React from 'react'
import { render, screen, fireEvent } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'

import { ThemeProvider, createTheme } from '@mui/material'
import ResponsiveHeader, { ResponsiveHeaderProps } from './ResponsiveHeader'

const testId = 'test-responsive-header'

const defaultProps = {
  testId
}

const renderComponent = (props?: Partial<ResponsiveHeaderProps>) => {
  const finalProps = { ...defaultProps, ...props }
  return render(
    <ThemeProvider theme={createTheme()}>
      <ResponsiveHeader {...finalProps} />
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

it('Updates pageY on scroll if hideOnScroll is true', async () => {
  renderComponent({
    testId,
    hideOnScroll: true
  })

  let init = 0
  const setState = jest.fn()
  const useStateSpy = jest.spyOn(React, 'useState')
  useStateSpy.mockImplementation(
    () => [init, setState] as [unknown, React.Dispatch<unknown>]
  )

  fireEvent.scroll(window, { target: { scrollY: 100 } })

  setTimeout(() => {
    expect(setState).toHaveBeenCalled()
  })
})
