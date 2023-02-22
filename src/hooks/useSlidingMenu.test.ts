import { renderHook, act } from '@testing-library/react-hooks'
import Swiper from 'swiper'

import useSlidingMenu from './useSlidingMenu'
import { waitFor } from '@testing-library/react'

const menuItems = [
  {
    title: 'Item 1'
  },
  {
    title: 'Item 2',
    childItems: [
      {
        title: 'Sub item 1',
        active: true
      },
      {
        title: 'Sub item 2',

        childItems: [
          {
            title: 'Third item 1'
          },
          {
            title: 'Third item 2'
          }
        ]
      }
    ]
  }
]

it('implements initial state', () => {
  const { result } = renderHook(() => useSlidingMenu(menuItems))
  const swiper = new Swiper('.something')

  act(() => {
    result.current.onInit(swiper)
  })

  waitFor(() => {
    expect(result.current.activeIndex).toBe(1)
    expect(result.current.secondLevel).toBeTruthy()
    expect(result.current.thirdLevel).toBe(null)
    expect(result.current.onInit).toHaveBeenCalledWith(swiper)
  })
})

it('renders default', () => {
  const { result } = renderHook(() =>
    useSlidingMenu([
      {
        title: 'Something'
      }
    ])
  )

  waitFor(() => {
    expect(result.current.activeIndex).toBe(0)
    expect(result.current.secondLevel).toBe(null)
    expect(result.current.thirdLevel).toBe(null)
  })
})

it('toggles second level', () => {
  const { result } = renderHook(() => useSlidingMenu(menuItems))

  act(() => {
    result.current.onItemClick(menuItems[1])
  })

  waitFor(() => {
    expect(result.current.secondLevel).toBeTruthy()
  })
})

it('toggles third level', () => {
  const { result } = renderHook(() => useSlidingMenu(menuItems))
  const item = menuItems[1].childItems ? menuItems[1].childItems[1] : null

  act(() => {
    if (item) {
      result.current.onItemClick(item)
    }
  })

  waitFor(() => {
    expect(result.current.thirdLevel).toBeTruthy()
  })
})

it('toggles back', () => {
  const { result } = renderHook(() => useSlidingMenu(menuItems))

  act(() => {
    result.current.onBackClick()
  })

  waitFor(() => {
    expect(result.current.activeIndex).toBe(0)
  })
})

it('resets menu', () => {
  const { result } = renderHook(() => useSlidingMenu(menuItems))

  act(() => {
    result.current.resetMenu()
  })

  waitFor(() => {
    expect(result.current.secondLevel).toBe(null)
    expect(result.current.thirdLevel).toBe(null)
    expect(result.current.activeIndex).toBe(0)
    expect(result.current.swiper?.slideTo).toHaveBeenCalledWith(0)
  })
})
