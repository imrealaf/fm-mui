import React from 'react'
import {
  Card,
  SlidingSteps,
  SlidingStepsProps,
  handleTextChange,
  handleEnterKey,
  ChangeEventData
} from 'fm-mui'
import { SwiperSlide } from 'swiper/react'
import { Alert, Box, TextField } from '@mui/material'

export type SignInData = {
  email: string
  password: string
}

export interface SignInFormProps extends SlidingStepsProps {
  data: SignInData
  error?: boolean
  errorMsg?: string
  isStep(num: number): boolean
  onChanged(data: ChangeEventData): void
  isActiveStepValid(): boolean | undefined
}

const SignInForm = ({
  data,
  isStep,
  error,
  errorMsg,
  onChanged,
  onNext,
  steps,
  onComplete,
  isActiveStepValid,
  ...rest
}: SignInFormProps) => {
  const Step1 = (
    <Box>
      <TextField
        fullWidth
        error={isStep(1) && error}
        label='Email'
        name='email'
        type='email'
        placeholder='Enter your email'
        value={data.email}
        onChange={(e) => handleTextChange(e, onChanged)}
        onKeyDown={(e) =>
          handleEnterKey(e, () => {
            if (isActiveStepValid && isActiveStepValid()) onNext(false)
          })
        }
      />
    </Box>
  )

  const Step2 = (
    <Box>
      <TextField
        fullWidth
        label='Password'
        name='password'
        type='password'
        placeholder='Enter your password'
        value={data.password}
        onChange={(e) => handleTextChange(e, onChanged)}
        onKeyDown={(e) =>
          handleEnterKey(e, () => {
            if (isActiveStepValid && isActiveStepValid() && onComplete)
              onComplete()
          })
        }
      />
    </Box>
  )

  const stepsContent = [Step1, Step2]

  return (
    <Card variant='outlinedElevation' contentProps={{ sx: { p: 0 } }}>
      <Box p={3}>
        {error && (
          <Alert severity='error' sx={{ mb: 2 }}>
            {errorMsg}
          </Alert>
        )}
        <SlidingSteps
          {...rest}
          steps={steps}
          onNext={onNext}
          speed={300}
          showProgress={false}
          prevBtnArrow
          nextBtnArrow
          onComplete={onComplete}
          finalBtnText='Sign In'
          nextBtnArrowProps={{
            color: 'primary'
          }}
          nextBtnProps={{
            pill: true
          }}
          alignActions={isStep(1) ? 'flex-end' : 'space-between'}
        >
          {steps?.map((step, i) => (
            <SwiperSlide key={step.title}>{stepsContent[i]}</SwiperSlide>
          ))}
        </SlidingSteps>
      </Box>
    </Card>
  )
}

export default SignInForm
