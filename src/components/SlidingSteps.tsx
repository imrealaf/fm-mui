import React from 'react'
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
  Card,
  CardProps,
  BoxProps,
  StepperProps,
  LinearProgressProps,
  CircularProgressProps,
  StepProps,
  StepLabelProps,
  TypographyProps,
  Backdrop,
  CircularProgress
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
  pending?: boolean
  progress?: number
  completed?: boolean
  completedContent?: React.ReactNode
  completedActions?: React.ReactNode
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
  ContainerComponent?: typeof Card | typeof Box
  ContainerProps?: CardProps | BoxProps
  StepperProps?: StepperProps
  StepProps?: StepProps
  StepLabelProps?: StepLabelProps
  LinearProgressProps?: LinearProgressProps
  CounterTextProps?: TypographyProps
  CircularProgressProps?: CircularProgressProps
  alignActions?: 'flex-start' | 'flex-end' | 'center'
  backdropOpacity?: number
  onNext(skip: boolean): void
  onPrev(): void
  onComplete?(): void
  children: React.ReactNode
}

const StyledSlidingSteps = styled(Box)<Partial<SlidingStepsProps>>(
  ({ theme, backdropOpacity = 0.5 }) => ({
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

    '.MuiBackdrop-root': {
      position: 'absolute',
      background: alpha(theme.palette.background.paper, backdropOpacity),
      zIndex: 20
    },

    '.SlidingSteps-content': {
      position: 'relative'
    }
  })
)

const SlidingSteps = ({
  steps = [],
  pending = false,
  progress = 0,
  completed = false,
  completedContent,
  completedActions,
  speed,
  effect = 'slide',
  initialSlide = 0,
  activeIndex = 0,
  alignActions = 'center',
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
  backdropOpacity,
  ContainerComponent = Box,
  ContainerProps,
  StepperProps,
  StepProps,
  StepLabelProps,
  LinearProgressProps,
  CounterTextProps,
  CircularProgressProps,
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
    return (
      <Box className='SlidingSteps-counter' textAlign='center' mb={1}>
        {variant === 'dots' ? (
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
        ) : (
          <Typography
            {...CounterTextProps}
            className='SlidingStepsCounter-text'
            mb={0}
            textAlign='center'
          >
            {activeIndex + 1}/{numSteps}
          </Typography>
        )}
      </Box>
    )
  }

  const getProgressBar = () => {
    return (
      <Box
        className='SlidingStepsProgress-root'
        textAlign='center'
        mb={showCounter ? 1 : 3}
        px={4}
      >
        <LinearProgress
          {...LinearProgressProps}
          variant='determinate'
          value={progress}
        />
      </Box>
    )
  }

  return (
    <StyledSlidingSteps
      className='SlidingSteps-root'
      backdropOpacity={backdropOpacity}
    >
      {/* Progress - desktop */}
      {/* Stepper */}
      {showProgress && progressVariant === 'stepper' && bp.smAndUp && (
        <Stepper
          {...StepperProps}
          className='SlidingStepsProgress-stepper'
          activeStep={activeIndex}
          sx={{ mb: 2 }}
        >
          {stepNames.map((step, i) => (
            <Step {...StepProps} completed={steps[i].completed}>
              <StepLabel {...StepLabelProps} optional={steps[i].optional}>
                {step}
              </StepLabel>
            </Step>
          ))}
        </Stepper>
      )}

      {showProgress && progressVariant === 'bar' && getProgressBar()}
      {showProgress &&
        showCounter &&
        progressVariant === 'bar' &&
        getCounter(counterVariant)}

      {/* Progress - mobile */}
      {showProgress &&
        progressVariant === 'stepper' &&
        bp.xs &&
        getProgressBar()}
      {showProgress &&
        progressVariant === 'stepper' &&
        showCounter &&
        bp.xs &&
        getCounter(counterVariant)}

      <Box
        {...ContainerProps}
        component={ContainerComponent}
        className='SlidingSteps-content'
      >
        <Backdrop open={pending}>
          <CircularProgress {...CircularProgressProps} />
        </Backdrop>
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
        >
          {completed && completedContent ? completedContent : children}
        </ReactSwiper>
      </Box>
      {!completed ? (
        <Box
          className='SlidingStepsActions-root'
          mt={2}
          display='flex'
          justifyContent={alignActions}
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
      ) : completedActions ? (
        completedActions
      ) : null}
    </StyledSlidingSteps>
  )
}

export default SlidingSteps
