import React from 'react'
import { Box, Grid, Typography, SvgIconProps } from '@mui/material'
import { useToggle, Card } from 'fm-mui'
import LockIcon from '@mui/icons-material/Lock'
import BadgeIcon from '@mui/icons-material/Badge'

import * as paths from 'routes/paths'
import UnstyledRouterLink from 'components/UnstyledRouterLink'
import PrivatePage from 'components/PrivatePage'
import UploadImageDialog from 'components/UploadImageDialog'
import AccountHeader from './account/AccountHeader'
import { useUser } from 'hooks'

const AccountRoute = () => {
  const { user, updateUser } = useUser()
  const imageDialog = useToggle()
  const onDelete = () => {
    if (user?.photoURL) {
      // deleteFile(
      //   user.photoURL,
      //   // File deleted successfully
      //   () => {
      //     updateUser({
      //       photoURL: "",
      //     });
      //   },
      //   // File deletion error
      //   (error) => {}
      // );
    }
  }

  const onUploadSuccess = async (downloadURL: string) => {
    try {
      await updateUser({
        photoURL: downloadURL
      })
    } catch (error) {
      console.log(error)
    }
  }

  const sections = [
    {
      title: 'Personal Info',
      description:
        'Your personal information in our system and options to manage it',
      url: paths.ACCOUNT_PERSONAL_INFO_ROUTE,
      icon: BadgeIcon
    },
    {
      title: 'Security',
      description:
        'Settings and recommendations to help you keep your account secure',
      url: paths.ACCOUNT_SECURITY_ROUTE,
      icon: LockIcon
    }
  ]

  const iconProps: SvgIconProps = {
    fontSize: 'small',
    color: 'primary',
    sx: {
      mr: 1
    }
  }

  return (
    <Box>
      <UploadImageDialog
        storagePath='/images/users/profile'
        fileName={user?.uid}
        open={imageDialog.open}
        onClose={imageDialog.hide}
        onSuccess={onUploadSuccess}
      />
      <AccountHeader
        user={user}
        imageProps={{
          src: user?.photoURL as string,
          onActionClick: imageDialog.show,
          onDelete
        }}
      />
      <PrivatePage maxWidth='md'>
        <Grid container spacing={2}>
          {sections.map((section) => (
            <Grid key={section.title} item xs={12} sm={6}>
              <UnstyledRouterLink to={section.url}>
                <Card
                  variant='outlinedElevation'
                  elevationOnHover
                  sx={{ height: '100%' }}
                >
                  <Typography
                    display='flex'
                    variant='h6'
                    alignItems='center'
                    mb={1}
                  >
                    {React.createElement(section.icon, iconProps)}{' '}
                    {section.title}
                  </Typography>
                  <Typography variant='body2' color='grey6.main'>
                    {section.description}
                  </Typography>
                </Card>
              </UnstyledRouterLink>
            </Grid>
          ))}
        </Grid>
      </PrivatePage>
    </Box>
  )
}

export default AccountRoute
