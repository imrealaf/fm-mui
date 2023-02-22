import React from 'react'
import { Box, BoxProps, Typography, styled } from '@mui/material'
import { useNavigate } from 'react-router-dom'
import LocalFireDepartmentIcon from '@mui/icons-material/LocalFireDepartment'

import { PaletteColor } from 'types'

interface LogoProps extends BoxProps {
  size?: 'small' | 'medium' | 'large' | 'xlarge' | 'xxlarge'
  to?: string
  color?: PaletteColor
  showText?: boolean
}

const StyledLogo = styled(Box)<LogoProps>(({ size, to }) => ({
  display: 'inline-flex',
  alignItems: 'center',
  color: 'red',

  '.MuiTypography-root': {
    fontFamily: 'Outfit'
  },

  ...(to && {
    cursor: 'pointer'
  }),

  ...(size === 'small' && {
    '.MuiSvgIcon-root': {
      fontSize: '2.2rem'
    },
    '.MuiTypography-root': {
      fontSize: '1.2rem'
    }
  }),

  ...(size === 'medium' && {
    '.MuiSvgIcon-root': {
      fontSize: '2.8rem'
    },
    '.MuiTypography-root': {
      fontSize: '1.5rem'
    }
  }),

  ...(size === 'large' && {
    '.MuiSvgIcon-root': {
      fontSize: '4rem'
    },
    '.MuiTypography-root': {
      fontSize: '2.2rem'
    }
  }),

  ...(size === 'xlarge' && {
    '.MuiSvgIcon-root': {
      fontSize: '5rem'
    },
    '.MuiTypography-root': {
      fontSize: '2.8rem'
    }
  }),

  ...(size === 'xxlarge' && {
    '.MuiSvgIcon-root': {
      fontSize: '6.5rem'
    },
    '.MuiTypography-root': {
      fontSize: '3.4rem'
    }
  })
}))

function Logo({
  size = 'medium',
  color = 'primary',
  to,
  showText = true,
  ...rest
}: LogoProps) {
  const navigate = useNavigate()
  const handleClick = () => {
    if (to) {
      navigate(to)
    }
  }

  return (
    <StyledLogo
      className='Logo'
      onClick={handleClick}
      to={to}
      size={size}
      component='span'
      {...rest}
    >
      <LocalFireDepartmentIcon color={color} />
      {showText && (
        <Typography color={`${color}.main`} variant='h6'>
          {process.env.REACT_APP_NAME}
        </Typography>
      )}
    </StyledLogo>
  )
}

export default Logo
