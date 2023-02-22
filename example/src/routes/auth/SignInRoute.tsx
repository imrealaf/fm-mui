import React from 'react'
import { Box, Typography } from '@mui/material'
import {
  SplitScreenLayout,
  useBreakpoint,
  useSlidingSteps,
  ChangeEventData,
  Button
} from 'fm-mui'
// import { useNavigate, useLocation } from 'react-router-dom'

import Logo from 'components/Logo'
import { SIGN_UP_ROUTE } from 'routes/paths'
import UnstyledRouterLink from 'components/UnstyledRouterLink'
import { isRequired, isEmail } from 'validations'
import SignInForm, { SignInData } from 'components/forms/SignInForm'
import { useAuth } from 'hooks'

const initialState: SignInData = {
  email: '',
  password: ''
}

const SignInRoute = () => {
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
  // const navigate = useNavigate()
  const [data, setData] = React.useState(initialState)
  const [error, setError] = React.useState(false)
  const [errorMsg, setErrorMsg] = React.useState('')
  const { userExists, signInWithEmail } = useAuth()
  const bp = useBreakpoint()
  // const location = useLocation()

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
    console.log('submit')
    try {
      await signInWithEmail(data.email, data.password)
    } catch (error) {
      setError(true)
      setErrorMsg(error.message)
    } finally {
      setPending(false)
    }
  }

  React.useEffect(() => {
    setError(false)
    setErrorMsg('')
    if (isStep(1)) validateStep(1, isEmail(data.email))
    if (isStep(2)) {
      validateStep(2, isRequired(data.password))
    }
  }, [data, activeIndex])

  return (
    <SplitScreenLayout
      contentLeft={
        <Box>
          <Logo color='white' size='large' />
        </Box>
      }
      contentLeftProps={{
        sx: {
          bgcolor: 'primary.main',
          color: 'common.white'
        }
      }}
      contentRight={
        <Box sx={{ width: bp.xs ? 300 : 340 }}>
          <Typography textAlign='center' variant='h4' mb={2}>
            Sign in
          </Typography>
          <SignInForm
            data={data}
            steps={steps}
            error={error}
            errorMsg={errorMsg}
            activeIndex={activeIndex}
            onChanged={onChange}
            onPrev={handleBack}
            onNext={handleNext}
            onComplete={handleComplete}
            completed={completed}
            pending={pending}
            onInit={onInit}
            onActiveIndexChange={onActiveIndexChange}
            initialSlide={initialSlide}
            nextBtnDisabled={!isActiveStepValid()}
            isActiveStepValid={isActiveStepValid}
            isStep={isStep}
          />
          <Box textAlign='center' mt={2}>
            <Typography variant='body2' color='text.secondary' mb={1}>
              Don't have an account?
            </Typography>
            <UnstyledRouterLink to={SIGN_UP_ROUTE}>
              <Button size='small' pill variant='outlined'>
                Sign Up
              </Button>
            </UnstyledRouterLink>
          </Box>
        </Box>
      }
      hideLeft={bp.mdAndDown}
    />
  )
}

export default SignInRoute
