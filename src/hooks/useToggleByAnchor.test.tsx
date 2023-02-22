import React from 'react'
import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'

import useToggleByAnchor from './useToggleByAnchor'

const TestComponent = () => {
  const component = useToggleByAnchor()
  return (
    <>
      <button type='button' data-testid='show-button' onClick={component.show}>
        Show
      </button>
      <button type='button' data-testid='hide-button' onClick={component.hide}>
        Hide
      </button>
      <div data-testid='open'>{component.open ? 'open' : 'closed'}</div>
      <div data-testid='anchor-el'>
        {component.anchorEl ? 'not null' : 'null'}
      </div>
    </>
  )
}

it('initial state', () => {
  render(<TestComponent />)
  const open = screen.getByTestId('open')
  const anchorEl = screen.getByTestId('anchor-el')
  expect(open.textContent).toBe('closed')
  expect(anchorEl.textContent).toBe('null')
})

it('shows element on show', () => {
  render(<TestComponent />)
  const showButton = screen.getByTestId('show-button')
  const open = screen.getByTestId('open')
  const anchorEl = screen.getByTestId('anchor-el')

  userEvent.click(showButton)
  waitFor(() => {
    expect(open.textContent).toBe('open')
    expect(anchorEl.textContent).toBe('not null')
  })
})

it('hides element on hide', () => {
  render(<TestComponent />)
  const hideButton = screen.getByTestId('hide-button')
  const open = screen.getByTestId('open')
  const anchorEl = screen.getByTestId('anchor-el')

  userEvent.click(hideButton)
  waitFor(() => {
    expect(open.textContent).toBe('closed')
    expect(anchorEl.textContent).toBe('null')
  })
})
