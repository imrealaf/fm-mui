import * as React from 'react'
import { render, screen, fireEvent, getByTestId } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import '@testing-library/jest-dom/extend-expect'

import { ThemeProvider, createTheme } from '@mui/material'
import SearchField, { SearchFieldProps } from './SearchField'

const testId = 'test-search-field'

const defaultProps: SearchFieldProps = {
  testId
}

const renderComponent = (props?: Partial<SearchFieldProps>) => {
  const finalProps = { ...defaultProps, ...props }
  return render(
    <ThemeProvider theme={createTheme()}>
      <SearchField {...finalProps} />
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

it('renders submit btn disabled on mount', async () => {
  const { container } = renderComponent({
    testId
  })
  expect(container).toBeTruthy()
  const submitBtn = screen.getByTestId(`${testId}-submit-btn`)
  if (submitBtn) {
    expect(submitBtn.classList.contains('Mui-disabled')).toBe(true)
  }
})

it('renders clear btn if has value and fires onClear when clicked', async () => {
  const onClear = jest.fn()
  const { container } = renderComponent({
    testId,
    value: 'fdsfsd',
    onClear
  })
  expect(container).toBeTruthy()
  const btn = screen.getByTestId(`${testId}-clear-btn`)
  expect(btn).toBeTruthy()

  userEvent.click(btn)
  setTimeout(() => {
    expect(onClear).toHaveBeenCalled()
  })
})

it('fires onSubmit when submit btn is clicked', async () => {
  const onSubmit = jest.fn()
  const { container } = renderComponent({
    testId,
    value: 'fdsfsd',
    onSubmit
  })
  expect(container).toBeTruthy()
  const btn = screen.getByTestId(`${testId}-submit-btn`)
  expect(btn).toBeTruthy()

  userEvent.click(btn)
  setTimeout(() => {
    expect(onSubmit).toHaveBeenCalled()
  })
})

it('fires onSubmit when enter key is pressed', async () => {
  const onSubmit = jest.fn()
  const { container } = renderComponent({
    testId,
    value: 'fdsfsd',
    onSubmit
  })
  expect(container).toBeTruthy()
  const btn = screen.getByTestId(`${testId}-submit-btn`)
  expect(btn).toBeTruthy()

  userEvent.keyboard('[Enter]')
  setTimeout(() => {
    expect(onSubmit).toHaveBeenCalled()
  })
})

it('doesnt fire onSubmit when enter key is pressed with disableEnterKeySubmit', async () => {
  const onSubmit = jest.fn()
  const { container } = renderComponent({
    testId,
    value: 'fdsfsd',
    onSubmit,
    disableEnterKeySubmit: true
  })
  expect(container).toBeTruthy()
  const btn = screen.getByTestId(`${testId}-submit-btn`)
  expect(btn).toBeTruthy()

  userEvent.keyboard('[Enter]')
  setTimeout(() => {
    expect(onSubmit).toHaveBeenCalledTimes(0)
  })
})
