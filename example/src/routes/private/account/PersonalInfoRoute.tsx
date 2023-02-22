import React from 'react'
import { Typography, Box } from '@mui/material'
import BadgeIcon from '@mui/icons-material/Badge'
import ErrorIcon from '@mui/icons-material/Error'
import CheckCircleIcon from '@mui/icons-material/CheckCircle'

import * as paths from 'routes/paths'
import PageTitle from 'components/PageTitle'
import PageFetchingData from 'components/hoc/PageFetchingData'
import PrivatePage from 'components/PrivatePage'
import CategorySections from 'components/CategorySections'
import { useUser } from 'hooks'

const PersonalInfoRoute = () => {
  const { user, profile, getProfile, birthdayFormatted, age } = useUser()
  const [loading, setLoading] = React.useState(!profile)

  const basicInfoRows = [
    {
      label: 'Name',
      value: profile ? `${profile?.firstName} ${profile?.lastName}` : '',
      path: paths.ACCOUNT_NAME_ROUTE
    },
    {
      label: 'Birthday',
      value: birthdayFormatted ? (
        <Typography>
          {birthdayFormatted}
          <Typography
            component='span'
            variant='body2'
            ml={1}
            color='grey6.main'
          >
            ({age} years old)
          </Typography>
        </Typography>
      ) : (
        ''
      ),
      path: paths.ACCOUNT_BIRTHDAY_ROUTE
    },
    {
      label: 'Gender',
      value: profile?.gender,
      path: paths.ACCOUNT_GENDER_ROUTE
    }
  ]

  const contactInfoRows = [
    {
      label: 'Email',
      alignLabel: 'start',
      value: (
        <>
          {user?.email}
          <Box display='flex' mt={1} alignItems='center'>
            {!user?.emailVerified ? (
              <>
                <ErrorIcon color='warning' fontSize='small' sx={{ mr: 1 }} />
                <Typography variant='body2' color='warning.main'>
                  Not verified
                </Typography>
              </>
            ) : (
              <>
                <CheckCircleIcon
                  color='success'
                  fontSize='small'
                  sx={{ mr: 1 }}
                />
                <Typography variant='body2' color='success.main'>
                  Verified
                </Typography>
              </>
            )}
          </Box>
        </>
      ),
      path: '/this-doesnt-work'
    }
  ]

  const sections = [
    {
      title: 'Basic Info',
      rows: basicInfoRows
    },
    {
      title: 'Contact Info',
      rows: contactInfoRows
    }
  ]

  return (
    <PageFetchingData
      data={profile}
      getData={getProfile}
      setLoading={() => setLoading(false)}
    >
      <PrivatePage
        maxWidth='md'
        pageTitle={
          <PageTitle
            title='Personal Info'
            subtitle='Info about you and your preferences across our services'
            icon={BadgeIcon}
          />
        }
      >
        <CategorySections
          items={sections}
          loading={loading}
          backPath={paths.ACCOUNT_ROUTE}
        />
      </PrivatePage>
    </PageFetchingData>
  )
}

export default PersonalInfoRoute
