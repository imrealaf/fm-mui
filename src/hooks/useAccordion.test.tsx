import { waitFor } from '@testing-library/react'
import { renderHook, act } from '@testing-library/react-hooks'
import useAccordion from './useAccordion'

it('implements initial state', () => {
  const { result } = renderHook(() => useAccordion())
  expect(result.current.expanded).toBe(false)
  expect(result.current.isExpanded('panel-1')).toBe(false)
})

it('toggles properly', () => {
  const { result } = renderHook(() => useAccordion())

  act(() => {
    result.current.toggle('panel-1')
  })

  waitFor(() => {
    expect(result.current.expanded).toBe('panel-1')
    expect(result.current.isExpanded('panel-1')).toBe(true)
  })
})
