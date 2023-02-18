import * as React from 'react'
import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'

import { useStateMock } from '../test-utils'
import menuItems from '../data/menuItems'
import { ThemeProvider, createTheme } from '@mui/material'
import MobileMenu, { MobileMenuProps } from './MobileMenu'

const testId = 'test-mobile-menu'

const defaultProps = {
  testId,
  items: menuItems
}

const renderComponent = (props?: Partial<MobileMenuProps>) => {
  const finalProps = { ...defaultProps, ...props }
  return render(
    <ThemeProvider theme={createTheme()}>
      <MobileMenu {...finalProps} />
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

it('renders proper content', async () => {
  const setSwiper = jest.fn()
  const setSecondLevel = jest.fn()
  const setThirdLevel = jest.fn()
  jest
    .spyOn(React, 'useState')
    .mockImplementation(useStateMock(setSwiper))
    .mockImplementation(useStateMock(setSecondLevel))
    .mockImplementation(useStateMock(setThirdLevel))
  renderComponent({
    testId,
    items: menuItems
  })

  setTimeout(() => {
    expect(setSwiper).toHaveBeenCalled()
    expect(setSecondLevel).toHaveBeenCalled()
    expect(setThirdLevel).toHaveBeenCalled()
  })
  //   expect(setThirdLevel).toHaveBeenCalled()
})
