import { Select, styled } from '@mui/material'

const EditableSelect = styled(Select)(({ theme }) => ({
  '.MuiFormLabel-root.Mui-disabled': {
    color:
      theme.palette.mode === 'dark'
        ? theme.palette.grey5.main
        : theme.palette.grey6.main
  },

  '&.MuiInputBase-root.Mui-disabled:before': {
    opacity: 0
  },

  '&.MuiInputBase-root.Mui-disabled .MuiSvgIcon-root': {
    opacity: 0
  },

  '.MuiInputBase-input.Mui-disabled': {
    WebkitTextFillColor:
      theme.palette.mode === 'dark'
        ? 'rgba(255, 255, 255, 1)'
        : 'rgba(0, 0, 0, 1)'
  }
}))

export default EditableSelect
