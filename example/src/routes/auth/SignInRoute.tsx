import React from 'react'
import { Box, Typography } from '@mui/material'
import { SplitScreenLayout, useBreakpoint } from 'fm-mui'

import SignIn from '../../components/SignIn'

const SignInRoute = () => {
  const bp = useBreakpoint()
  return (
    <SplitScreenLayout
      contentLeft={
        <Box>
          <Typography variant='h3' fontWeight={700}>
            {process.env.REACT_APP_NAME}
          </Typography>
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
          <SignIn />
        </Box>
      }
      hideLeft={bp.mdAndDown}
    />
  )
}

export default SignInRoute
