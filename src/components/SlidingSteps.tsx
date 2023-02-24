import React from 'react'
import {
  Box,
  styled,
  Stepper,
  Step,
  StepLabel,
  Typography,
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
  CircularProgress,
  IconButton,
  IconButtonProps
} from '@mui/material'
import { Swiper as ReactSwiper, SwiperProps } from 'swiper/react'
import { EffectFade } from 'swiper'
import ArrowBackIcon from '@mui/icons-material/ArrowBack'
import ArrowForwardIcon from '@mui/icons-material/ArrowForward'

import Button, { ButtonProps } from './Button'
import { useBreakpoint } from 'hooks'
import clsx from 'clsx'

export interface SlidingStepsRecord {
  title: string
  optional?: boolean
  valid?: boolean
  completed?: boolean
}

export interface SlidingStepsProps extends SwiperProps {
  testId?: string
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
  nextBtnArrow?: boolean
  nextBtnArrowProps?: IconButtonProps
  prevBtnText?: string
  prevBtnArrow?: boolean
  prevBtnArrowProps?: IconButtonProps
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
  alignActions?: 'flex-start' | 'flex-end' | 'center' | 'space-between'
  backdropOpacity?: number
  onNext(event: React.MouseEvent<HTMLButtonElement>): void
  onPrev(): void
  onComplete?(): void
  children?: React.ReactNode
}

const StyledSlidingSteps = styled(Box, {
  shouldForwardProp: (prop) => prop !== 'backdropOpacity'
})<Partial<SlidingStepsProps>>(({ theme, backdropOpacity = 0.5 }) => ({
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
}))

const SlidingSteps = ({
  testId = 'sliding-steps',
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
  nextBtnArrow,
  prevBtnArrow,
  nextBtnArrowProps,
  prevBtnArrowProps,
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
  children,
  ...rest
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

  const getCounter = (variant: 'text' | 'dots') => {
    return (
      <Box
        data-testid={`${testId}-counter`}
        className='SlidingSteps-counter'
        textAlign='center'
        mb={1}
      >
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
        data-testid={`${testId}-progress-bar`}
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

  const finalNextBtnProps = {
    ...nextBtnProps,
    disabled: nextBtnDisabled,
    onClick: onNext
  }

  return (
    <StyledSlidingSteps
      data-testid={testId}
      className='SlidingSteps-root'
      backdropOpacity={backdropOpacity}
    >
      {/* Progress - desktop */}
      {/* Stepper */}
      {showProgress && progressVariant === 'stepper' && bp.smAndUp && (
        <Stepper
          data-testid={`${testId}-stepper`}
          {...StepperProps}
          className='SlidingStepsProgress-stepper'
          activeStep={activeIndex}
          sx={{ mb: 2 }}
        >
          {stepNames.map((step, i) => (
            <Step key={step} {...StepProps} completed={steps[i].completed}>
              <StepLabel
                {...StepLabelProps}
                optional={steps[i].optional ? <></> : null}
              >
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
          {...rest}
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
            <>
              {prevBtnArrow ? (
                <IconButton
                  data-testid={`${testId}-prev-icon-btn`}
                  {...prevBtnArrowProps}
                  onClick={onPrev}
                >
                  <ArrowBackIcon />
                </IconButton>
              ) : (
                <Button
                  data-testid={`${testId}-prev-btn`}
                  {...prevBtnProps}
                  onClick={onPrev}
                >
                  {prevBtnText}
                </Button>
              )}
            </>
          )}

          {/* Skip button */}
          {activeStep.optional && (
            <Button
              data-testid={`${testId}-skip-btn`}
              {...skipBtnProps}
              onClick={onNext}
            >
              Skip
            </Button>
          )}

          {/* Next button */}
          {isLastStep ? (
            <Button
              data-testid={`${testId}-complete-btn`}
              {...finalNextBtnProps}
              onClick={onComplete}
            >
              {finalBtnText}
            </Button>
          ) : nextBtnArrow ? (
            <IconButton
              data-testid={`${testId}-next-icon-btn`}
              {...nextBtnArrowProps}
              disabled={nextBtnDisabled}
              onClick={onNext}
            >
              <ArrowForwardIcon />
            </IconButton>
          ) : (
            <Button data-testid={`${testId}-next-btn`} {...finalNextBtnProps}>
              {nextBtnText}
            </Button>
          )}
        </Box>
      ) : completedActions ? (
        completedActions
      ) : null}
    </StyledSlidingSteps>
  )
}

export default SlidingSteps
