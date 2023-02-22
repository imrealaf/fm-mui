import React from 'react'
import {
  Card,
  SlidingSteps,
  SlidingStepsProps,
  handleTextChange,
  ChangeEventData
} from 'fm-mui'
import { SwiperSlide } from 'swiper/react'
import {
  Alert,
  Box,
  TextField,
  InputAdornment,
  IconButton,
  Typography,
  Collapse
} from '@mui/material'
import VisibilityIcon from '@mui/icons-material/Visibility'
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff'
import CheckIcon from '@mui/icons-material/Check'
import CloseIcon from '@mui/icons-material/Close'

import { passwordConfig } from 'config'
import { isMinLength, containsNumbers } from 'validations'

export type SignUpData = {
  email: string
  firstName: string
  password: string
  confirmPassword: string
}

export interface SignUpFormProps extends SlidingStepsProps {
  data: SignUpData
  error?: boolean
  errorMsg?: string
  isStep(num: number): boolean
  onChanged(data: ChangeEventData): void
  isActiveStepValid(): boolean | undefined
}

const SignUpForm = ({
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
}: SignUpFormProps) => {
  const [showPassword, setShowPassword] = React.useState(false)

  const Step1 = (
    <>
      <Box mb={2}>
        <TextField
          fullWidth
          required
          error={isStep(1) && error}
          label='Email'
          name='email'
          type='email'
          placeholder='Your email address'
          value={data.email}
          onChange={(e) => handleTextChange(e, onChanged)}
        />
      </Box>
      <Box>
        <TextField
          fullWidth
          required
          label='First Name'
          name='firstName'
          placeholder='Your first name'
          value={data.firstName}
          onChange={(e) => handleTextChange(e, onChanged)}
        />
      </Box>
    </>
  )

  const PasswordAdornment = (
    <InputAdornment position='end'>
      <IconButton
        aria-label='toggle password visibility'
        onClick={() => setShowPassword((show) => !show)}
      >
        {showPassword ? <VisibilityOffIcon /> : <VisibilityIcon />}
      </IconButton>
    </InputAdornment>
  )

  const isPasswordValid = () => {
    return isMinLength(data.password) && containsNumbers(data.password)
  }

  const passwordRules = [
    {
      text: `Must be at least ${passwordConfig.minLength} characters`,
      valid: isMinLength
    }
  ]

  if (passwordConfig.containsNumbers) {
    passwordRules.push({
      text: 'Must contain at least 1 number',
      valid: containsNumbers
    })
  }

  const iconStyles = { marginRight: '3px', fontSize: 14 }

  const Step2 = (
    <>
      <Box mb={2}>
        <TextField
          fullWidth
          label='Password'
          name='password'
          placeholder='Create a password'
          value={data.password}
          onChange={(e) => handleTextChange(e, onChanged)}
          type={showPassword ? 'text' : 'password'}
          InputProps={{
            endAdornment: PasswordAdornment
          }}
        />
      </Box>
      <Collapse in={!isPasswordValid()}>
        <Box>
          {passwordRules.map((rule) => {
            const valid = rule.valid(data.password)
            return (
              <Typography
                key={rule.text}
                component='div'
                variant='caption'
                display='flex'
                alignItems='center'
                color={valid ? 'success.main' : 'grey7.main'}
              >
                {valid ? (
                  <CheckIcon sx={iconStyles} />
                ) : (
                  <CloseIcon sx={iconStyles} />
                )}
                {rule.text}
              </Typography>
            )
          })}
        </Box>
      </Collapse>
      <Collapse in={isPasswordValid()}>
        <Box>
          <TextField
            fullWidth
            label='Confirm Password'
            name='confirmPassword'
            placeholder='Confirm your password'
            value={data.confirmPassword}
            onChange={(e) => handleTextChange(e, onChanged)}
            type={showPassword ? 'text' : 'password'}
            InputProps={{
              endAdornment: PasswordAdornment
            }}
          />
        </Box>
      </Collapse>
      <Box sx={{ my: 2 }} />
    </>
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

export default SignUpForm
