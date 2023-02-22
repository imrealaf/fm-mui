import React from 'react'
import { Box, Typography } from '@mui/material'
import { useNavigate } from 'react-router-dom'

import * as paths from 'routes/paths'
import UnstyledRouterLink from 'components/UnstyledRouterLink'
import { Button } from 'fm-mui'
import PrivatePage from 'components/PrivatePage'

const PrivateNotFoundRoute = () => {
  const navigate = useNavigate()
  return (
    <PrivatePage>
      <Box textAlign='center'>
        <Typography variant='h3'>404</Typography>
        <Typography variant='subtitle1' mb={3}>
          Oops! We couldn't find any page matching the url
        </Typography>
        <Button
          pill
          color='inherit'
          variant='text'
          sx={{ mr: 1 }}
          onClick={() => navigate(-1)}
        >
          Go Back
        </Button>
        <UnstyledRouterLink to={paths.DASHBOARD_ROUTE}>
          <Button pill variant='outlined'>
            Go to Dashboard
          </Button>
        </UnstyledRouterLink>
      </Box>
    </PrivatePage>
  )
}

export default PrivateNotFoundRoute
