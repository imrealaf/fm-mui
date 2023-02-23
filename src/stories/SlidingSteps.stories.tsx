import React, { useEffect, useState } from 'react'
import { ComponentStory, ComponentMeta } from '@storybook/react'
import {
  Box,
  Grid,
  Container,
  TextField,
  Button,
  Typography
} from '@mui/material'
import { SwiperSlide } from 'swiper/react'
import validator from 'validator'

import { handleTextChange } from 'utils'
import SlidingSteps from 'components/SlidingSteps'
import { useSlidingSteps } from 'hooks'

export default {
  title: 'Navigation/SlidingSteps',
  component: SlidingSteps,
  parameters: {
    layout: 'fullscreen'
  }
} as ComponentMeta<typeof SlidingSteps>

const stepsData = [
  {
    title: 'Step 1'
    // valid: true
  },
  {
    title: 'Step 2',
    optional: true
  },
  {
    title: 'Step 3'
    // valid: true
  }
]

const Template: ComponentStory<typeof SlidingSteps> = (args) => {
  const {
    isStep,
    steps,
    progress,
    pending,
    setPending,
    completed,
    onInit,
    onActiveIndexChange,
    goToNext,
    goToPrev,
    completeSteps,
    activeIndex,
    initialSlide,
    validateStep,
    isActiveStepValid,
    isActiveStepOptional
  } = useSlidingSteps(stepsData)

  const [data, setData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    passwordConfirm: ''
  })

  const onChange = ({ name, value }) => {
    setData({
      ...data,
      [name]: value
    })
  }

  const handleNext = () => {
    if (isStep(1)) {
      setPending(true)
      setTimeout(() => {
        setPending(false)
        goToNext()
      }, 2000)
    } else {
      goToNext(isActiveStepOptional())
    }
  }

  const handleComplete = () => {
    setPending(true)
    setTimeout(() => {
      setPending(false)
      completeSteps()
    }, 2000)
  }

  const Step1 = (
    <Box
      sx={{
        pt: {
          xs: 1,
          sm: 2
        }
      }}
    >
      <Grid container spacing={2} mb={2}>
        <Grid item xs={12} md={6}>
          <TextField
            required
            name='firstName'
            label='First Name'
            fullWidth
            value={data.firstName}
            onChange={(e) => handleTextChange(e, onChange)}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <TextField
            name='lastName'
            label='Last Name'
            fullWidth
            value={data.lastName}
            onChange={(e) => handleTextChange(e, onChange)}
          />
        </Grid>
      </Grid>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <TextField
            required
            type='email'
            name='email'
            label='Email'
            fullWidth
            value={data.email}
            onChange={(e) => handleTextChange(e, onChange)}
          />
        </Grid>
      </Grid>
    </Box>
  )

  const Step2 = <Box>setp 2</Box>

  const Step3 = (
    <Box
      sx={{
        pt: {
          xs: 1,
          sm: 2
        }
      }}
    >
      <Grid container>
        <Grid item xs={12} mb={2}>
          <TextField
            required
            name='password'
            label='Password'
            fullWidth
            value={data.password}
            onChange={(e) => handleTextChange(e, onChange)}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            required
            name='passwordConfirm'
            label='Confirm Password'
            fullWidth
            value={data.passwordConfirm}
            onChange={(e) => handleTextChange(e, onChange)}
          />
        </Grid>
      </Grid>
    </Box>
  )

  const stepsContent = [Step1, Step2, Step3]

  const completedContent = (
    <Box textAlign='center' p={4}>
      Thanks for signing up
    </Box>
  )

  const completedActions = (
    <>
      <Button>Go Somewhere</Button>
    </>
  )

  useEffect(() => {
    if (isStep(1))
      validateStep(
        1,
        data.firstName.length > 0 && validator.isEmail(data.email)
      )
    if (isStep(3))
      validateStep(
        3,
        data.password.length > 0 && data.passwordConfirm.length > 0
      )
  }, [data, activeIndex])

  return (
    <Box>
      <Container maxWidth='sm'>
        <Typography variant='h4' textAlign='center' mb={2}>
          Sign Up
        </Typography>
        <SlidingSteps
          {...args}
          progress={progress}
          completed={completed}
          pending={pending}
          showProgress={!completed}
          steps={steps}
          activeIndex={activeIndex}
          onInit={onInit}
          onActiveIndexChange={onActiveIndexChange}
          onPrev={goToPrev}
          onNext={handleNext}
          initialSlide={initialSlide}
          nextBtnDisabled={!isActiveStepValid()}
          onComplete={handleComplete}
          completedContent={completedContent}
          completedActions={completedActions}
          // ContainerComponent={Card}
          // ContainerProps={{
          //   variant: 'outlined'
          // }}
        >
          {steps.map((step, i) => (
            <SwiperSlide key={step.title}>{stepsContent[i]}</SwiperSlide>
          ))}
        </SlidingSteps>
      </Container>
    </Box>
  )
}

export const Default = Template.bind({})
Default.args = {}
