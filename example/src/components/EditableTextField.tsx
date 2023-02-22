import { TextField, styled } from '@mui/material'

const EditableTextField = styled(TextField)(({ theme }) => ({
  '.MuiFormLabel-root.Mui-disabled': {
    color:
      theme.palette.mode === 'dark'
        ? theme.palette.grey5.main
        : theme.palette.grey6.main
  },

  '.MuiInputBase-root.Mui-disabled:before': {
    opacity: 0
  },

  '.MuiInputBase-input.Mui-disabled': {
    WebkitTextFillColor:
      theme.palette.mode === 'dark'
        ? 'rgba(255, 255, 255, 1)'
        : 'rgba(0, 0, 0, 1)'
  },

  '.MuiInputBase-root.Mui-disabled': {
    '.MuiInputAdornment-root .MuiTypography-root': {
      color: theme.palette.text.primary
    }
  }
}))

export default EditableTextField
