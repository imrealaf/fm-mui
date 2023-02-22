import { Components, Theme } from '@mui/material'

const MuiButton: Components<Theme>['MuiButton'] = {
  defaultProps: {
    variant: 'contained',
    disableElevation: true
  },
  styleOverrides: {
    root: ({ ownerState }) => ({
      ...(ownerState.variant === 'outlined' && {
        border: '2px solid',
        '&:hover': {
          border: '2px solid'
        }
      })
    })
  }
}

export default MuiButton
