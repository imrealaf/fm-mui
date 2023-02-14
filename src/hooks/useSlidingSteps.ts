import { useEffect, useState } from 'react'
import Swiper from 'swiper'

import { SlidingStepsRecord } from '../components/SlidingSteps'

function useSlidingSteps(data: SlidingStepsRecord[] = [], initialSlide = 0) {
  const [swiper, setSwiper] = useState<Swiper | null>(null)
  const [steps, setSteps] = useState<SlidingStepsRecord[]>(data)
  const [activeIndex, setActiveIndex] = useState<number>(initialSlide)
  const [completed, setCompleted] = useState(false)
  const [pending, setPending] = useState(false)
  const [progress, setProgress] = useState(0)

  const onInit = (swiperInstance: Swiper) => {
    setSwiper(swiperInstance)
  }

  const onActiveIndexChange = (swiperInstance: Swiper) => {
    setActiveIndex(swiperInstance.activeIndex)
  }

  const goToStep = (step: number) => {
    if (step) swiper?.slideTo(step)
  }

  const goToNext = (skip?: boolean) => {
    const activeStep = steps[activeIndex]
    if (!skip) {
      activeStep.completed = true
      setSteps([...steps])
    }
    swiper?.slideNext()
  }

  const completeSteps = () => {
    const lastStep = steps[steps.length - 1]
    lastStep.completed = true
    setSteps([...steps])
    setProgress(100)
    setCompleted(true)
  }

  const goToPrev = () => {
    swiper?.slidePrev()
  }

  const validateStep = (num: number, isValid: boolean) => {
    const step = steps[num - 1]
    if (step) {
      step.completed = false
      step.valid = isValid
      setSteps([...steps])
    }
  }

  const isStep = (num: number) => {
    return num ? num === activeIndex + 1 : false
  }

  const getActiveStep = () => {
    return steps[activeIndex]
  }

  useEffect(() => {
    setProgress(Math.round(((activeIndex + 0) / steps.length) * 100))
  }, [activeIndex])

  return {
    initialSlide,
    swiper,
    steps,
    progress,
    pending,
    setPending,
    completed,
    activeIndex,
    numSteps: steps.length,
    validateStep,
    onInit,
    onActiveIndexChange,
    goToNext,
    goToPrev,
    goToStep,
    completeSteps,
    isStep,
    activeStep: activeIndex + 1,
    getActiveStep,
    isActiveStepOptional: () => getActiveStep().optional,
    isActiveStepCompleted: () => getActiveStep().completed,
    isActiveStepValid: () => getActiveStep().valid
  }
}

export default useSlidingSteps
