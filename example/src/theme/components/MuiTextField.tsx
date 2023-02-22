import { Components, Theme } from '@mui/material'

const MuiTextField: Components<Theme>['MuiTextField'] = {
  defaultProps: {
    variant: 'standard'
  },
  styleOverrides: {
    root: {
      '& input:-webkit-autofill, & input:-webkit-autofill:hover, & input:-webkit-autofill:focus, & input:-webkit-autofill:active':
        {
          WebkitBoxShadow: '0 0 0 30px white inset !important'
        }
    }
  }
}

export default MuiTextField
