import * as React from 'react'
import { render } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import '@testing-library/jest-dom/extend-expect'

import { ThemeProvider, createTheme } from '@mui/material'
import Card, { CardProps } from './Card'

const testId = 'test-card'

const defaultProps: CardProps = {
  testId
}

const renderComponent = (props?: Partial<CardProps>) => {
  const finalProps = { ...defaultProps, ...props }
  return render(
    <ThemeProvider theme={createTheme()}>
      <Card {...finalProps} />
    </ThemeProvider>
  )
}

it('renders without crashing', async () => {
  const { container, getByTestId } = renderComponent({
    testId
  })
  expect(container).toBeTruthy()
  expect(getByTestId(testId)).toBeTruthy()
})

it('renders outlinedElevation variant', async () => {
  const { getByTestId } = renderComponent({
    testId,
    variant: 'outlinedElevation'
  })
  const card = getByTestId(testId)
  const styles = getComputedStyle(card)
  expect(styles.boxShadow).toBeDefined()
})

it('adds styles for elevationOnHover', async () => {
  const { getByTestId } = renderComponent({
    testId,
    variant: 'outlined',
    elevationOnHover: true
  })
  const card = getByTestId(testId)
  expect(getComputedStyle(card).cursor).toBe('pointer')

  await userEvent.hover(card)
  expect(getComputedStyle(card).boxShadow).toBeDefined()
})

it('renders addtional content', async () => {
  const { getByTestId } = renderComponent({
    testId,
    header: {
      title: 'Title'
    },
    actions: <div>actions</div>,
    media: {
      image: 'something.jpg'
    }
  })
  const header = getByTestId(`${testId}-header`)
  const media = getByTestId(`${testId}-media`)
  const actions = getByTestId(`${testId}-actions`)

  expect(header).toBeTruthy()
  expect(media).toBeTruthy()
  expect(actions).toBeTruthy()
})
