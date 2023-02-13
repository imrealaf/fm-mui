import React from 'react'
import { SwiperSlide } from 'swiper/react'

export interface SlidingStepProps {
  children: React.ReactNode
}

const SlidingStep = ({ children }: SlidingStepProps) => {
  return <SwiperSlide>{children}</SwiperSlide>
}

export default SlidingStep
