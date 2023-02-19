import React from 'react'
import {
  Card,
  SlidingSteps,
  handleTextChange,
  handleEnterKey,
  ChangeEventData,
  useSlidingSteps
} from 'fm-mui'
import { SwiperSlide } from 'swiper/react'
import { Alert, Box, TextField } from '@mui/material'
import validator from 'validator'
import { useAuth } from '../hooks'
import { useNavigate } from 'react-router-dom'

export type SignInData = {
  email: string
  password: string
}

export interface SignInProps {
  data: SignInData
  pending?: boolean
  error?: string
  onSubmit?(): void
}

const initialState: SignInData = {
  email: '',
  password: ''
}

const SignIn = () => {
  const stepsData = [
    {
      title: 'Email'
    },
    {
      title: 'Password'
    }
  ]
  const {
    isStep,
    steps,
    pending,
    setPending,
    completed,
    onInit,
    onActiveIndexChange,
    goToNext,
    goToPrev,
    activeIndex,
    initialSlide,
    validateStep,
    isActiveStepValid
  } = useSlidingSteps(stepsData)
  const navigate = useNavigate()
  const [data, setData] = React.useState(initialState)
  const [error, setError] = React.useState(false)
  const [errorMsg, setErrorMsg] = React.useState('')
  const { userExists, signInWithEmail } = useAuth()

  const onChange = ({ name, value }: ChangeEventData) => {
    setData({
      ...data,
      [name]: value
    })
  }

  const handleNext = async () => {
    setPending(true)
    try {
      await userExists(data.email)
      goToNext()
    } catch (error) {
      setError(true)
      setErrorMsg(error.message)
    } finally {
      setPending(false)
    }
  }

  const handleBack = () => {
    goToPrev()
    setData({
      ...data,
      password: ''
    })
  }

  const handleComplete = async () => {
    setPending(true)
    try {
      await signInWithEmail(data.email, data.password)
      setTimeout(() => {
        navigate('/dashboard')
      })
    } catch (error) {
      const { code, message } = error
      setError(true)
      setErrorMsg(message)
      console.log(code, message)
    } finally {
      setPending(false)
    }
  }

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
        onChange={(e) => handleTextChange(e, onChange)}
        onKeyDown={(e) =>
          handleEnterKey(e, () => {
            if (isActiveStepValid()) handleNext()
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
        onChange={(e) => handleTextChange(e, onChange)}
      />
    </Box>
  )

  const stepsContent = [Step1, Step2]

  React.useEffect(() => {
    setError(false)
    setErrorMsg('')
    if (isStep(1))
      validateStep(1, data.email.length > 0 && validator.isEmail(data.email))
    if (isStep(2)) {
      validateStep(2, data.password.length > 0)
    }
  }, [data, activeIndex])

  return (
    <Card variant='outlinedElevation' contentProps={{ sx: { p: 0 } }}>
      <Box p={3}>
        {error && (
          <Alert severity='error' sx={{ mb: 2 }}>
            {errorMsg}
          </Alert>
        )}
        <SlidingSteps
          speed={300}
          completed={completed}
          pending={pending}
          showProgress={false}
          steps={steps}
          activeIndex={activeIndex}
          onInit={onInit}
          onActiveIndexChange={onActiveIndexChange}
          onPrev={handleBack}
          onNext={handleNext}
          initialSlide={initialSlide}
          nextBtnDisabled={!isActiveStepValid()}
          onComplete={handleComplete}
          prevBtnArrow
          nextBtnArrow
          finalBtnText='Sign In'
          nextBtnArrowProps={{
            color: 'primary'
          }}
          nextBtnProps={{
            pill: true
          }}
          alignActions={isStep(1) ? 'flex-end' : 'space-between'}
        >
          {steps.map((step, i) => (
            <SwiperSlide key={step.title}>{stepsContent[i]}</SwiperSlide>
          ))}
        </SlidingSteps>
      </Box>
    </Card>
  )
}

export default SignIn
