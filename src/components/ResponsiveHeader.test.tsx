import * as React from 'react'
import { render, screen, fireEvent, getByTestId } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import '@testing-library/jest-dom/extend-expect'

import menuItems from '../data/menuItems'
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

it('doesnt show header if pageY < 0', async () => {
  const { container } = renderComponent({
    testId,
    hideOnScroll: true
  })
  fireEvent.scroll(window, { target: { scrollY: 0 } })

  setTimeout(() => {
    const header = getByTestId(container, testId)
    expect(getComputedStyle(header).transform).toBeUndefined()
  })
})

it('doesnt show header if pageY < 0', async () => {
  const { container } = renderComponent({
    testId,
    hideOnScroll: true
  })
  fireEvent.scroll(window, { target: { scrollY: 0 } })

  setTimeout(() => {
    const header = getByTestId(container, testId)
    expect(document.body.classList.contains('header-hidden')).toBe(true)
    expect(getComputedStyle(header).transform).toBeUndefined()
  })
})

it('shows header if pageY > last scroll pos', async () => {
  const { container } = renderComponent({
    testId,
    hideOnScroll: true
  })
  fireEvent.scroll(window, { target: { scrollY: 500 } })

  setTimeout(() => {
    const header = getByTestId(container, testId)
    expect(document.body.classList.contains('header-hidden')).toBe(false)
    expect(getComputedStyle(header).transform).toBe(
      'translate3d(0, -100%, 0) !important'
    )
  })
})

it('Opens mobile menu and hides proper content', async () => {
  //   const setShowActions = jest.fn()
  const setShowActions: any = (showActions: any) => [showActions, jest.fn()]
  const setShow: any = (show: any) => [show, jest.fn()]
  const setLastScrollPosition: any = (lastScrollPosition: any) => [
    lastScrollPosition,
    jest.fn()
  ]
  jest
    .spyOn(React, 'useState')
    .mockImplementation(setShowActions)
    .mockImplementation(setShow)
    .mockImplementation(setLastScrollPosition)
  const { container } = renderComponent({
    testId,
    menuItems,
    hideActionsOnToggle: true,
    open: true
  })

  // Change the viewport to 500px.
  global.innerWidth = 500

  // Trigger the window resize event.
  fireEvent.scroll(window, { target: { scrollY: 100 } })
  fireEvent.resize(window)

  setTimeout(() => {
    const toggle = getByTestId(container, `${testId}-mobile-menu-toggle`)

    expect(toggle).toBeTruthy()
    userEvent.click(toggle)

    setTimeout(() => {
      const menu = getByTestId(container, 'mobile-menu')
      expect(menu).toBeTruthy()
      expect(container.querySelector(`[data-testid="${testId}-actions"]`)).toBe(
        null
      )
      expect(setShowActions).toHaveBeenCalled()
      expect(setShow).toHaveBeenCalledTimes(0)
      expect(setLastScrollPosition).toHaveBeenCalledTimes(0)
    })
  })
})

it('Updates pageY on scroll if hideOnScroll is true', async () => {
  const setPageY = jest.fn()
  const pageYMock: any = (pageY: any) => [pageY, setPageY]
  jest.spyOn(React, 'useState').mockImplementation(pageYMock)

  renderComponent({
    testId,
    hideOnScroll: true
  })

  fireEvent.scroll(window, { target: { scrollY: 100 } })

  setTimeout(() => {
    expect(pageYMock).toHaveBeenCalledWith(100)
  })
})
