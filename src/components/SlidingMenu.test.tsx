import React from 'react'
import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import '@testing-library/jest-dom/extend-expect'

// import items from '../data/menuItems'
import { ThemeProvider, createTheme } from '@mui/material'
import SlidingMenu, { SlidingMenuProps } from './SlidingMenu'

const testId = 'test-sliding-menu'

const items = [
  {
    title: 'Item 1'
  },
  {
    title: 'Item 2',
    childItems: [
      {
        title: 'Sub item 1'
      },
      {
        title: 'Sub item 2',
        childItems: [
          {
            title: 'Third item 1'
            // active: true
          },
          {
            title: 'Third item 2'
          }
        ]
      }
    ]
  }
]

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
  expect(screen.getByTestId(testId)).toBeTruthy() //
})

it('goes to second level and back', async () => {
  const onItemClick = jest.fn()
  const onBackClick = jest.fn()
  const { container, getByTestId } = renderComponent({
    testId,
    onBackClick
  })
  const menuItems = container.querySelectorAll('.SlidingMenuItem-parent')
  const item = menuItems[0]
  userEvent.click(item)

  waitFor(() => {
    expect(onItemClick).toHaveBeenCalledWith(items[1])
    const backBtn = getByTestId(`${testId}-menu-item-back`)

    userEvent.click(backBtn)

    waitFor(() => {
      expect(onBackClick).toHaveBeenCalled()
    })
  })
})
