import React from 'react'
import { Box, Typography } from '@mui/material'
import {
  SplitScreenLayout,
  useBreakpoint,
  useSlidingSteps,
  ChangeEventData,
  Button
} from 'fm-mui'
import { useNavigate } from 'react-router-dom'

import { SIGN_IN_ROUTE } from 'routes/paths'
import UnstyledRouterLink from 'components/UnstyledRouterLink'
import SignUpForm, { SignUpData } from 'components/forms/SignUpForm'
import { signUpRedirect } from 'config'
import {
  isRequired,
  isMinLength,
  match,
  isEmail,
  containsNumbers
} from 'validations'
import { useAuth } from 'hooks'

const initialState: SignUpData = {
  email: '',
  firstName: '',
  password: '',
  confirmPassword: ''
}

const SignUpRoute = () => {
  const stepsData = [
    {
      title: 'Details'
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
  const { userNotExists, createUserWithEmail } = useAuth()
  const bp = useBreakpoint()

  const onChange = ({ name, value }: ChangeEventData) => {
    setData({
      ...data,
      [name]: value
    })
  }

  const handleNext = async () => {
    setPending(true)
    try {
      await userNotExists(data.email)
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
      password: '',
      confirmPassword: ''
    })
  }

  const handleComplete = async () => {
    setPending(true)
    try {
      await createUserWithEmail(data.email, data.password, data.firstName)
      setTimeout(() => {
        navigate(signUpRedirect)
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

  React.useEffect(() => {
    setError(false)
    setErrorMsg('')

    if (isStep(1)) {
      validateStep(1, isEmail(data.email) && isRequired(data.firstName))
    }

    if (isStep(2)) {
      validateStep(
        2,
        isMinLength(data.password) &&
          containsNumbers(data.password) &&
          match(data.password, data.confirmPassword)
      )
    }
  }, [data, activeIndex])
  return (
    <SplitScreenLayout
      contentLeft={
        <Box sx={{ width: bp.xs ? 300 : 340 }}>
          <Typography textAlign='center' variant='h4' mb={2}>
            Sign up
          </Typography>
          <SignUpForm
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
              Already have an account?
            </Typography>
            <UnstyledRouterLink to={SIGN_IN_ROUTE}>
              <Button size='small' pill variant='outlined'>
                Sign In
              </Button>
            </UnstyledRouterLink>
          </Box>
        </Box>
      }
      contentRight={
        <Box>
          <Typography variant='h3' fontWeight={700}>
            {process.env.REACT_APP_NAME}
          </Typography>
        </Box>
      }
      contentRightProps={{
        sx: {
          bgcolor: 'primary.main',
          color: 'common.white'
        }
      }}
      hideRight={bp.mdAndDown}
    />
  )
}

export default SignUpRoute
