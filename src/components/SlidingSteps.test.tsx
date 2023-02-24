import React from 'react'
import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import '@testing-library/jest-dom/extend-expect'

// import items from '../data/menuItems'
import { ThemeProvider, createTheme } from '@mui/material'
import SlidingSteps, { SlidingStepsProps } from './SlidingSteps'

const testId = 'test-sliding-menu'

const stepsData = [
  {
    title: 'Step 1',
    valid: true
  },
  {
    title: 'Step 2',
    optional: true
  },
  {
    title: 'Step 3'
  }
]

const defaultProps = {
  testId,
  steps: stepsData,
  onInit: jest.fn(),
  onNext: jest.fn(),
  onPrev: jest.fn()
}

const renderComponent = (props?: Partial<SlidingStepsProps>) => {
  const finalProps = { ...defaultProps, ...props }
  return render(
    <ThemeProvider theme={createTheme()}>
      <SlidingSteps {...finalProps} />
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

it('goes to next step', async () => {
  const onNext = jest.fn()
  const { getByTestId } = renderComponent({
    testId,
    onNext,
    nextBtnDisabled: false
  })
  const nextBtn = getByTestId(`${testId}-next-btn`)
  userEvent.click(nextBtn)
  waitFor(() => {
    expect(onNext).toHaveBeenCalled()
  })
})

it('renders progress with bar/counter text', async () => {
  const { getByTestId } = renderComponent({
    testId,
    showProgress: true,
    progressVariant: 'bar'
  })
  const progress = getByTestId(`${testId}-progress-bar`)
  const counter = getByTestId(`${testId}-counter`)
  expect(progress).toBeTruthy()
  expect(counter).toBeTruthy()
  expect(counter.querySelector('.SlidingStepsCounter-text')).toBeTruthy()
})

it('renders progress with bar/counter dots', async () => {
  const { getByTestId } = renderComponent({
    testId,
    showProgress: true,
    progressVariant: 'bar',
    counterVariant: 'dots'
  })
  const counter = getByTestId(`${testId}-counter`)
  expect(counter.querySelector('.SlidingStepsCounter-dots')).toBeTruthy()
})
