import * as React from 'react'
import { render, waitFor } from '@testing-library/react'

import config from '../config'
import { ThemeProvider, createTheme } from '@mui/material'
import ResponsiveMain, { ResponsiveMainProps } from './ResponsiveMain'

const testId = 'test-ResponsiveMain'

const defaultProps: ResponsiveMainProps = {
  testId,
  children: <div>content</div>
}

const renderComponent = (props?: Partial<ResponsiveMainProps>) => {
  const finalProps = { ...defaultProps, ...props }
  return render(
    <ThemeProvider theme={createTheme()}>
      <ResponsiveMain {...finalProps} />
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

it('renders proper offsets with drawer', async () => {
  const { getByTestId } = renderComponent({
    testId,
    drawer: <div className='drawer'></div>
  })
  const main = getByTestId(testId)
  expect(getComputedStyle(main).paddingTop).toBe(
    `${config.ResponsiveHeader.defaultProps.height}px`
  )
  waitFor(() => {
    expect(getComputedStyle(main).paddingLeft).toBe(
      `${config.global.drawerWidth}px`
    )
  })
})

it('renders proper offsets with drawer on right', async () => {
  const { getByTestId } = renderComponent({
    testId,
    drawer: <div className='drawer'></div>,
    drawerPosition: 'right'
  })
  const main = getByTestId(testId)
  waitFor(() => {
    expect(getComputedStyle(main).paddingRight).toBe(
      `${config.global.drawerWidth}px`
    )
  })
})
