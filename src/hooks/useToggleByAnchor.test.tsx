import { waitFor } from '@testing-library/react'
import { renderHook, act } from '@testing-library/react-hooks'
import useToggleByAnchor from './useToggleByAnchor'

it('shows and hides elemnt', () => {
  const anchorEl = document.createElement('div') as HTMLElement
  const { result } = renderHook(() => useToggleByAnchor())

  const event = {
    currentTarget: anchorEl
  } as React.MouseEvent<HTMLElement>

  act(() => {
    result.current.show(event)
  })

  waitFor(() => {
    expect(result.current.anchorEl).toBe(anchorEl)
    expect(result.current.open).toBe(true)
  })

  act(() => {
    result.current.hide()
  })

  waitFor(() => {
    expect(result.current.anchorEl).toBe(null)
    expect(result.current.open).toBe(false)
  })
})
