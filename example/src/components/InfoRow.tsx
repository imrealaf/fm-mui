import { Grid, styled } from '@mui/material'

const InfoRow = styled(Grid, {
  shouldForwardProp: (prop) => prop !== 'disableHover'
})<{
  path: string | undefined
  disableHover: boolean | undefined
}>(({ theme, onClick, path, disableHover }) => ({
  borderBottom: `1px solid ${theme.palette.grey2.main}`,
  padding: `${theme.spacing(2)} 0`,
  transition: 'background .2s ease',
  cursor: 'pointer',

  ...(!onClick &&
    !path && {
      cursor: 'default'
    }),

  '.MuiGrid-item:first-of-type': {
    paddingLeft: theme.spacing(3)
  },

  '.MuiGrid-item:last-of-type': {
    paddingRight: theme.spacing(3),

    [theme.breakpoints.down('sm')]: {
      '.MuiSvgIcon-root': {
        position: 'relative',
        top: -9
      }
    }
  },

  [theme.breakpoints.down('sm')]: {
    padding: `${theme.spacing(1)} 0`,

    '.MuiGrid-item:nth-of-type(2)': {
      paddingLeft: theme.spacing(3)
    }
  },

  ...(!disableHover && {
    '&:hover': {
      background: theme.palette.grey1.main
    }
  }),

  '&:last-of-type': {
    border: 'none'
  }
}))

export default InfoRow
