import React, { useEffect, useState } from 'react'
import { ComponentStory, ComponentMeta } from '@storybook/react'
import { Box, Grid, Container, TextField, Card } from '@mui/material'
import { SwiperSlide } from 'swiper/react'
import validator from 'validator'

import { handleTextChange } from '../utils'
import SlidingSteps from '../components/SlidingSteps'
import { useSlidingSteps, useToggle } from '../hooks'

export default {
  title: 'Components/Custom/SlidingSteps',
  component: SlidingSteps,
  parameters: {
    layout: 'fullscreen'
  }
} as ComponentMeta<typeof SlidingSteps>

const stepsData = [
  {
    title: 'Step 1'
  },
  {
    title: 'Step 2',
    optional: true
  },
  {
    title: 'Step 3'
  }
]

const Template: ComponentStory<typeof SlidingSteps> = (args) => {
  const {
    swiper,
    steps,
    onInit,
    onActiveIndexChange,
    onNext,
    onPrev,
    activeIndex,
    initialSlide,
    currentStepIsValid,
    validateStep
  } = useSlidingSteps(stepsData)

  const [data, setData] = useState({
    firstName: '',
    lastName: '',
    email: ''
  })

  const onChange = ({ name, value }) => {
    setData({
      ...data,
      [name]: value
    })
  }

  const Step1 = (
    <Box p={3}>
      <Grid container spacing={2} mb={2}>
        <Grid item xs={12} md={6}>
          <TextField
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

  useEffect(() => {
    if (activeIndex === 0)
      validateStep(
        1,
        data.firstName.length > 0 &&
          data.lastName.length > 0 &&
          validator.isEmail(data.email)
      )
  }, [data, activeIndex])

  const Step2 = <Box>setp 2</Box>

  const stepsContent = [Step1, Step2]

  return (
    <Box>
      <Container maxWidth='sm'>
        <SlidingSteps
          {...args}
          steps={steps}
          activeIndex={activeIndex}
          onInit={onInit}
          onActiveIndexChange={onActiveIndexChange}
          onPrev={onPrev}
          onNext={onNext}
          initialSlide={initialSlide}
          nextBtnDisabled={!currentStepIsValid}
          onComplete={() => {
            alert('steps complete')
          }}
          containerComponent={Card}
          containerProps={{
            variant: 'outlined'
          }}
        >
          {steps.map((step, i) => (
            <SwiperSlide key={step.name}>{stepsContent[i]}</SwiperSlide>
          ))}
        </SlidingSteps>
      </Container>
    </Box>
  )
}

export const Default = Template.bind({})
Default.args = {}
