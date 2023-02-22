import { renderHook, act } from '@testing-library/react-hooks'
import Swiper from 'swiper'
import { waitFor } from '@testing-library/react'

import useSlidingSteps from './useSlidingSteps'

const stepsData = [
  {
    title: 'Step 1',
    completed: true,
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

it('renders correct', () => {
  const { result } = renderHook(() => useSlidingSteps(stepsData))
  const swiper = new Swiper('.something')

  act(() => {
    result.current.onInit(swiper)
    result.current.onActiveIndexChange(swiper)
  })

  waitFor(() => {
    expect(result.current.onInit).toHaveBeenCalledWith(swiper)
    expect(result.current.onActiveIndexChange).toHaveBeenCalledWith(swiper)
  })
})

it('goes to step', () => {
  const { result } = renderHook(() => useSlidingSteps(stepsData))

  act(() => {
    result.current.goToStep(1)
  })

  waitFor(() => {
    expect(result.current.swiper?.slideTo).toHaveBeenCalledWith(1)
  })
})

it('goes to next', () => {
  const { result } = renderHook(() => useSlidingSteps(stepsData))

  act(() => {
    result.current.goToNext()
  })

  waitFor(() => {
    expect(result.current.swiper?.slideNext).toHaveBeenCalled()
  })
})

it('goes to prev', () => {
  const { result } = renderHook(() => useSlidingSteps(stepsData))

  act(() => {
    result.current.goToPrev()
  })

  waitFor(() => {
    expect(result.current.swiper?.slidePrev).toHaveBeenCalled()
  })
})

it('completes steps', () => {
  const { result } = renderHook(() => useSlidingSteps(stepsData))

  act(() => {
    result.current.completeSteps()
  })

  waitFor(() => {
    expect(result.current.progress).toBe(100)
    expect(result.current.completed).toBe(true)
  })
})

it('validates step', () => {
  const { result } = renderHook(() => useSlidingSteps(stepsData))

  act(() => {
    result.current.validateStep(1, true)
  })
})

it('returns current step', () => {
  const { result } = renderHook(() => useSlidingSteps(stepsData))
  expect(result.current.isStep(1)).toBe(true)
})

it('gets active step', () => {
  const { result } = renderHook(() => useSlidingSteps(stepsData))

  act(() => {
    result.current.getActiveStep()
  })

  waitFor(() => {
    expect(result.current.isActiveStepOptional()).toBe(false)
    expect(result.current.isActiveStepCompleted()).toBe(true)
    expect(result.current.isActiveStepValid()).toBe(true)
  })
})
