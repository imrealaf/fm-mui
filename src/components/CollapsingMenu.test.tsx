import React from 'react'
import { render, screen, getAllByTestId } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import '@testing-library/jest-dom/extend-expect'

import { ThemeProvider, createTheme } from '@mui/material'
import Search from '@mui/icons-material/Search'
import CollapsingMenu, { CollapsingMenuProps } from './CollapsingMenu'

const testId = 'test-collapsing-menu'

const items = [
  {
    title: 'Item 1',
    active: true,
    icon: Search
  },
  {
    title: 'Item 2',
    childItems: [
      {
        title: 'Sub item 1',
        active: true,
        icon: Search
      }
    ]
  }
]

const defaultProps = {
  testId
}

const renderComponent = (props?: Partial<CollapsingMenuProps>) => {
  const finalProps = { ...defaultProps, ...props }
  return render(
    <ThemeProvider theme={createTheme()}>
      <CollapsingMenu {...finalProps} />
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

it('renders no items', async () => {
  const { container } = renderComponent({
    testId
  })
  const menuItems = container.querySelectorAll('.CollapsingMenuItem-root')
  expect(menuItems).toHaveLength(0)
})

it('renders proper number of items', async () => {
  const { container } = renderComponent({
    testId,
    items
  })
  const itemEls = getAllByTestId(container, `${testId}-menu-item`)
  expect(itemEls).toHaveLength(2)
  userEvent.click(itemEls[1])
  setTimeout(() => {
    const childItems = getAllByTestId(container, `${testId}-menu-child-item`)
    expect(childItems).toHaveLength(1)
  }, 400)
})

it('renders lined variant', async () => {
  const { container } = renderComponent({
    testId,
    items,
    variant: 'lined'
  })
  const itemEls = getAllByTestId(container, `${testId}-menu-item`)
  const firstItemStyles = getComputedStyle(itemEls[0])
  const secondItemStyles = getComputedStyle(itemEls[1])
  expect(firstItemStyles.borderTop).toBeDefined()
  expect(secondItemStyles.borderTop).toBeDefined()
})

it('renders active classes', async () => {
  const { container } = renderComponent({
    testId,
    items,
    activeItemClass: 'my-class'
  })
  const itemEls = getAllByTestId(container, `${testId}-menu-item`)
  expect(itemEls[0].className).toContain('my-class')
})

it('renders item icon', async () => {
  const { container } = renderComponent({
    testId,
    items
  })
  const itemEls = getAllByTestId(container, `${testId}-menu-item`)
  const firstItem = itemEls[0]
  const icon = firstItem.querySelector(
    `[data-testid="${testId}-menu-item-icon"]`
  )
  expect(icon).toBeTruthy()
})

it('renders child item icon', async () => {
  const { container } = renderComponent({
    testId,
    items
  })
  const itemEls = getAllByTestId(container, `${testId}-menu-item`)
  const el = itemEls[1]
  userEvent.click(el)
  setTimeout(() => {
    const icon = el.querySelector(
      `[data-testid="${testId}-menu-child-item-icon"]`
    )
    expect(icon).toBeTruthy()
  }, 400)
})

it('renders proper more/less icon', async () => {
  const { container } = renderComponent({
    testId,
    items
  })
  const itemEls = getAllByTestId(container, `${testId}-menu-item`)
  const el = itemEls[1]
  const moreIcon = el.querySelector('[data-testid="ExpandMoreIcon"]')
  expect(moreIcon).toBeTruthy()
  userEvent.click(el)
  setTimeout(() => {
    const lessIcon = el.querySelector('[data-testid="ExpandLessIcon"]')
    expect(lessIcon).toBeTruthy()
  }, 400)
})

it('renders active item typography props', async () => {
  const { container } = renderComponent({
    testId,
    items,
    activeItemTypographyProps: {
      fontWeight: 700
    }
  })
  const itemEls = getAllByTestId(container, `${testId}-menu-item`)
  const el = itemEls[1]
  userEvent.click(el)
  setTimeout(() => {
    const textEl = el.querySelector(
      '.CollapsingMenuChildItem-root .MuiTypography-root'
    ) as Element
    expect(getComputedStyle(textEl).fontWeight).toBe('700')
  }, 400)
})
