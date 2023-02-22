import React from 'react'
import { User } from 'firebase/auth'
import { useBreakpoint } from 'fm-mui'
import { Typography, Box, Chip, useTheme } from '@mui/material'

import AccountImage, { AccountImageProps } from './AccountImage'

interface AccountHeaderProps {
  imageProps: AccountImageProps
  user: User | null
}

function AccountHeader({ user, imageProps }: AccountHeaderProps) {
  const bp = useBreakpoint()
  const theme = useTheme()
  return (
    <Box
      display='flex'
      flexDirection={bp.xs ? 'column' : 'row'}
      justifyContent='center'
      alignItems='center'
      py={4}
      sx={{
        bgcolor: theme.palette.mode === 'dark' ? 'grey1.main' : 'grey2.main'
      }}
    >
      <AccountImage {...imageProps} />
      <Box
        textAlign={bp.xs ? 'center' : 'left'}
        ml={bp.xs ? 0 : 3}
        mt={bp.xs ? 1 : 0}
      >
        <Typography variant='h5' color='primary.main'>
          {user?.displayName}
        </Typography>
        <Typography mb={1} variant={bp.xs ? 'body2' : 'body1'}>
          {user?.email}
        </Typography>
        <Chip
          variant='outlined'
          color={user?.emailVerified ? 'success' : undefined}
          label={user?.emailVerified ? 'Verified' : 'Not verified'}
          size='small'
        />
      </Box>
    </Box>
  )
}

export default AccountHeader
