import React, { useEffect, useRef, useState } from 'react'
import {
  Box,
  Button,
  styled,
  Stepper,
  Step,
  StepLabel,
  Typography,
  ButtonProps,
  LinearProgress,
  alpha,
  useTheme,
  Card,
  Fade,
  CardProps,
  BoxProps
} from '@mui/material'
import { Swiper as ReactSwiper, SwiperProps } from 'swiper/react'
import { EffectFade } from 'swiper'
import { useBreakpoint } from '../hooks'
import clsx from 'clsx'

export interface SlidingStepsRecord {
  title: string
  optional?: boolean
  valid?: boolean
  completed?: boolean
}

export interface SlidingStepsProps extends SwiperProps {
  steps?: SlidingStepsRecord[]
  showProgress?: boolean
  showCounter?: boolean
  progressVariant?: 'stepper' | 'bar'
  counterVariant?: 'text' | 'dots'
  activeIndex?: number
  nextBtnProps?: ButtonProps
  prevBtnProps?: ButtonProps
  skipBtnProps?: ButtonProps
  nextBtnText?: string
  prevBtnText?: string
  finalBtnText?: string
  nextBtnDisabled?: boolean
  containerComponent?: typeof Card | typeof Box
  containerProps?: CardProps | BoxProps
  onNext(skip?: boolean): void
  onPrev(): void
  onComplete?(): void
  children: React.ReactNode
}

const StyledSlidingSteps = styled(Box)<Partial<SlidingStepsProps>>(
  ({ theme }) => ({
    '.SlidingStepsCounter-dots': {
      span: {
        display: 'inline-block',
        width: 8,
        height: 8,
        borderRadius: '50%',
        background: theme.palette.grey[300],
        margin: '0 3px',

        '&.active': {
          background: theme.palette.primary.main
        }
      }
    },

    '.SlidingMenu-content': {
      position: 'relative',

      '.SlidingMenu-fade': {
        height: '100%',
        position: 'absolute',
        top: 0,
        zIndex: 10
      },

      '.SlidingMenuFade-left': {
        left: 0,
        backgroundImage: `linear-gradient(to left, ${alpha(
          theme.palette.background.paper,
          0
        )}, ${alpha(theme.palette.background.paper, 1)})`
      },

      '.SlidingMenuFade-right': {
        right: 0,
        backgroundImage: `linear-gradient(to right, ${alpha(
          theme.palette.background.paper,
          0
        )}, ${alpha(theme.palette.background.paper, 1)})`
      }
    }
  })
)

const SlidingSteps = ({
  steps = [],
  speed,
  effect = 'slide',
  initialSlide = 0,
  activeIndex = 0,
  nextBtnProps,
  prevBtnProps,
  skipBtnProps,
  nextBtnText = 'Next',
  prevBtnText = 'Back',
  finalBtnText = 'Complete',
  nextBtnDisabled = false,
  showProgress = true,
  showCounter = true,
  progressVariant = 'stepper',
  counterVariant = 'text',
  containerComponent = Box,
  containerProps,
  onInit,
  onActiveIndexChange,
  onNext,
  onPrev,
  onComplete,
  children
}: SlidingStepsProps) => {
  const numSteps = steps.length
  const isLastStep = numSteps - 1 === activeIndex
  const stepNames = steps.map((step) => step.title)
  const activeStep = steps[activeIndex]
  const bp = useBreakpoint()
  const theme = useTheme()
  const progress = Math.round((activeIndex / numSteps) * 100)
  const [fadeEdges, setFadeEdges] = useState(false)
  const fadeWidth = theme.spacing(2)
  const speeds = {
    slide: 500,
    fade: 300
  }

  const handleNextClick = (skip: boolean = false) => {
    if (isLastStep && onComplete) {
      onComplete()
    } else {
      onNext(skip)
    }
  }

  const getCounter = (variant: 'text' | 'dots') => {
    if (variant === 'dots') {
      return (
        <Box className='SlidingStepsCounter-dots'>
          {steps.map((step, i) => (
            <span
              key={step.title}
              className={clsx({
                active: i <= activeIndex
              })}
            ></span>
          ))}
        </Box>
      )
    } else {
      return (
        <Typography
          className='SlidingStepsCounter-text'
          mb={0}
          textAlign='center'
        >
          {activeIndex + 1}/{numSteps}
        </Typography>
      )
    }
  }

  const getProgressBar = () => {
    return (
      <Box
        className='SlidingStepsProgress-root'
        textAlign='center'
        mb={showCounter ? 1 : 3}
        px={4}
      >
        <LinearProgress variant='determinate' value={progress} />
      </Box>
    )
  }

  return (
    <StyledSlidingSteps className='SlidingSteps-root'>
      {/* Progress - desktop */}
      {/* Stepper */}
      {showProgress && progressVariant === 'stepper' && bp.smAndUp && (
        <Stepper
          className='SlidingStepsProgress-stepper'
          activeStep={activeIndex}
          sx={{ mb: 2 }}
        >
          {stepNames.map((step, i) => (
            <Step completed={steps[i].completed}>
              <StepLabel
                optional={
                  steps[i].optional ? (
                    <Typography variant='caption'>Optional</Typography>
                  ) : null
                }
              >
                {step}
              </StepLabel>
            </Step>
          ))}
        </Stepper>
      )}

      {showProgress && progressVariant === 'bar' && getProgressBar()}
      {showProgress && showCounter && progressVariant === 'bar' && (
        <Box className='SlidingSteps-counter' textAlign='center' mb={1}>
          {getCounter(counterVariant)}
        </Box>
      )}

      {/* Progress - mobile */}
      {showProgress &&
        progressVariant === 'stepper' &&
        bp.xs &&
        getProgressBar()}
      {showProgress &&
        progressVariant === 'stepper' &&
        showCounter &&
        bp.xs && (
          <Box className='SlidingSteps-counter' textAlign='center' mb={1}>
            {getCounter(counterVariant)}
          </Box>
        )}

      <Box
        {...containerProps}
        component={containerComponent}
        className='SlidingMenu-content'
      >
        {effect !== 'fade' && (
          <Fade in={fadeEdges}>
            <Box
              className='SlidingMenu-fade SlidingMenuFade-left'
              sx={{
                width: fadeWidth
              }}
            />
          </Fade>
        )}
        <ReactSwiper
          modules={[EffectFade]}
          speed={speed || speeds[effect]}
          initialSlide={initialSlide}
          effect={effect}
          fadeEffect={{
            crossFade: true
          }}
          spaceBetween={0}
          slidesPerView={1}
          allowTouchMove={false}
          onSwiper={onInit}
          onActiveIndexChange={onActiveIndexChange}
          onSlideChangeTransitionStart={() => setFadeEdges(true)}
          onSlideChangeTransitionEnd={() => setFadeEdges(false)}
        >
          {children}
        </ReactSwiper>
        {effect !== 'fade' && (
          <Fade in={fadeEdges}>
            <Box
              className='SlidingMenu-fade SlidingMenuFade-right'
              sx={{
                width: fadeWidth
              }}
            />
          </Fade>
        )}
      </Box>
      <Box
        className='SlidingStepsActions-root'
        mt={2}
        display='flex'
        justifyContent='center'
      >
        {/* Previous button */}
        {activeIndex > 0 && (
          <Button {...prevBtnProps} onClick={onPrev}>
            {prevBtnText}
          </Button>
        )}

        {/* Skip button */}
        {activeStep.optional && (
          <Button {...skipBtnProps} onClick={() => handleNextClick(true)}>
            Skip
          </Button>
        )}

        {/* Next button */}
        <Button
          {...nextBtnProps}
          disabled={nextBtnDisabled}
          onClick={() => handleNextClick()}
        >
          {isLastStep ? finalBtnText : nextBtnText}
        </Button>
      </Box>
    </StyledSlidingSteps>
  )
}

export default SlidingSteps
