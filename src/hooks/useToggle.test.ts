import { renderHook, act } from '@testing-library/react-hooks'
import useToggle from './useToggle'

it('shows elmement on show', () => {
  const { result } = renderHook(() => useToggle())

  act(() => {
    result.current.show()
  })

  expect(result.current.open).toBe(true)
})

it('hides elmement on hide', () => {
  const { result } = renderHook(() => useToggle())

  act(() => {
    result.current.hide()
  })

  expect(result.current.open).toBe(false)
})

it('toggles elmement on toggle', () => {
  const { result } = renderHook(() => useToggle(true))

  act(() => {
    result.current.toggle()
  })

  expect(result.current.open).toBe(false)
})
