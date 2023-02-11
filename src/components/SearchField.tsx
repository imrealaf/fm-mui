import React from 'react'
import {
  IconButton,
  InputAdornment,
  OutlinedInput,
  OutlinedInputProps,
  styled,
  Fade
} from '@mui/material'
import SearchIcon from '@mui/icons-material/Search'
import CloseIcon from '@mui/icons-material/Close'

import { handleEnterKey } from '../utils'

export interface SearchFieldProps extends OutlinedInputProps {
  value?: string
  disableEnterKeySubmit?: boolean
  onClear?(): void
  onSubmit?(): void
}

const StyledSearchField = styled(OutlinedInput)(() => ({
  borderRadius: 30
}))

const SearchField = ({
  value = '',
  onClear = () => {},
  onSubmit = () => {},
  disableEnterKeySubmit = false,
  ...rest
}: SearchFieldProps) => {
  const showClear = value.length > 0
  const submitDisabled = value.length === 0
  const onKeyDown = (event: React.KeyboardEvent) => {
    if (value.length > 0 && !disableEnterKeySubmit) {
      handleEnterKey(event, onSubmit)
    }
  }
  return (
    <StyledSearchField
      {...rest}
      value={value}
      onKeyDown={onKeyDown}
      endAdornment={
        <InputAdornment position='end'>
          <Fade in={showClear}>
            <IconButton size='small' onClick={onClear}>
              <CloseIcon />
            </IconButton>
          </Fade>
          <IconButton
            size='small'
            disabled={submitDisabled}
            color={submitDisabled ? 'default' : 'primary'}
            onClick={onSubmit}
          >
            <SearchIcon />
          </IconButton>
        </InputAdornment>
      }
    />
  )
}

export default SearchField
