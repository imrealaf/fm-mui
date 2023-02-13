import { useEffect, useState } from 'react'
import Swiper from 'swiper'

import { SlidingStepsRecord } from '../components/SlidingSteps'

function useSlidingSteps(data: SlidingStepsRecord[] = [], initialSlide = 0) {
  const [swiper, setSwiper] = useState<Swiper | null>(null)
  const [steps, setSteps] = useState<SlidingStepsRecord[]>(data)
  const [activeIndex, setActiveIndex] = useState<number>(initialSlide)
  const [currentStepIsValid, setCurrentStepIsValid] = useState(false)

  const onInit = (swiperInstance: Swiper) => {
    setSwiper(swiperInstance)
  }

  const onActiveIndexChange = (swiperInstance: Swiper) => {
    console.log(swiperInstance.activeIndex)
    setActiveIndex(swiperInstance.activeIndex)
  }

  const goToStep = (step: number) => {
    if (step) swiper?.slideTo(step)
  }

  const onNext = (skip?: boolean) => {
    const activeStep = steps[activeIndex]
    if (!skip) {
      activeStep.completed = true
      setSteps([...steps])
    }
    swiper?.slideNext()
  }

  const onPrev = () => {
    swiper?.slidePrev()
  }

  const validateStep = (num: number, isValid: boolean) => {
    const step = steps[num - 1]
    step.valid = isValid
    setSteps([...steps])
  }

  useEffect(() => {
    const activeStep = steps[activeIndex]
    if (!activeStep.valid) activeStep.completed = false
    const isValid = activeStep.valid || activeStep.completed ? true : false
    setCurrentStepIsValid(isValid)
  }, [steps, activeIndex])

  return {
    initialSlide,
    swiper,
    steps,
    currentStepIsValid,
    activeIndex,
    numSteps: steps.length,
    validateStep,
    onInit,
    onActiveIndexChange,
    onNext,
    onPrev,
    goToStep
  }
}

export default useSlidingSteps
