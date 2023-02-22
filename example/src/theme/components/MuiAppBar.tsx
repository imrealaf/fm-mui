import { Components, Theme } from '@mui/material'

const MuiAppBar: Components<Theme>['MuiAppBar'] = {
  defaultProps: {
    color: 'primary'
  },
  styleOverrides: {
    root: ({ theme }) => ({
      ...(theme.palette.mode === 'dark' && {
        background: theme.palette.primary.main
      })
    })
  }
}

export default MuiAppBar
