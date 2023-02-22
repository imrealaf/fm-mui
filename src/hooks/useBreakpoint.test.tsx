import React from 'react'
import { render } from '@testing-library/react'

import useBreakpoint from './useBreakpoint'

const TestComponent = () => {
  const bp = useBreakpoint()
  return <span>{bp.xs ? 'small' : 'medium'}</span>
}

it('returs correct media query value', async () => {
  const { container } = render(<TestComponent />)
  expect(container.querySelector('span')?.textContent).toBe('medium')
})
