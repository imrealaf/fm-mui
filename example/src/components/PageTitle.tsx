import React from 'react'
import { Box, Typography, SvgIcon, SvgIconProps } from '@mui/material'

interface PageTitleProps {
  title: string
  subtitle?: string
  icon?: typeof SvgIcon
  iconProps?: SvgIconProps
}

const defaultIconProps: SvgIconProps = {
  color: 'primary',
  fontSize: 'small',
  sx: {
    mr: 1
  }
}

function PageTitle({ title, subtitle, icon, iconProps }: PageTitleProps) {
  return (
    <Box textAlign='center' p={3} pb={0}>
      <Typography
        display='flex'
        alignItems='center'
        justifyContent='center'
        component='div'
        variant='h4'
        mb={1}
      >
        {icon
          ? React.createElement(icon, {
              ...defaultIconProps,
              ...iconProps
            })
          : null}
        {title}
      </Typography>
      {subtitle && (
        <Typography variant='body2' color='grey6.main'>
          {subtitle}
        </Typography>
      )}
    </Box>
  )
}

export default PageTitle
