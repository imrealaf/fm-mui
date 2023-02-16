import React from 'react'
import {
  IconButton,
  IconButtonProps,
  InputAdornment,
  OutlinedInput,
  OutlinedInputProps,
  SvgIconProps,
  styled,
  Fade
} from '@mui/material'
import SearchIcon from '@mui/icons-material/Search'
import HighlightOffIcon from '@mui/icons-material/HighlightOff'

import { handleEnterKey } from '../utils'

export interface SearchFieldProps extends OutlinedInputProps {
  testId?: string
  value?: string
  naked?: boolean
  disableEnterKeySubmit?: boolean
  elevationOnHover?: boolean
  elevationOnFocus?: boolean
  IconButtonProps?: IconButtonProps
  IconProps?: SvgIconProps
  submitBtnProps?: IconButtonProps
  clearBtnProps?: IconButtonProps
  onClear?(): void
  onSubmit?(): void
}

const StyledSearchField = styled(OutlinedInput, {
  shouldForwardProp: (prop) =>
    prop !== 'elevationOnHover' &&
    prop !== 'elevationOnFocus' &&
    prop !== 'naked'
})<Partial<SearchFieldProps>>(
  ({ theme, elevationOnHover, elevationOnFocus, naked }) => ({
    border: 'none',
    paddingLeft: theme.spacing(1),
    transition: 'all .2s ease',

    '.MuiOutlinedInput-notchedOutline': {
      display: 'none'
    },

    ...(!naked && {
      borderRadius: 30,
      background: theme.palette.grey[100],

      ...(elevationOnHover && {
        '&:hover': {
          boxShadow: theme.shadows[2]
        }
      }),

      ...(elevationOnFocus && {
        '&.Mui-focused': {
          boxShadow: theme.shadows[2]
        }
      })
    })
  })
)

const SearchField = ({
  testId = 'search-field',
  placeholder = 'Search ...',
  value = '',
  naked = false,
  elevationOnHover = false,
  elevationOnFocus = false,
  disableEnterKeySubmit = false,
  IconButtonProps,
  IconProps,
  submitBtnProps,
  clearBtnProps,
  onClear = () => {},
  onSubmit = () => {},
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
      data-testid={testId}
      {...rest}
      placeholder={placeholder}
      naked={naked}
      elevationOnHover={elevationOnHover}
      elevationOnFocus={elevationOnFocus}
      value={value}
      onKeyDown={onKeyDown}
      endAdornment={
        <InputAdornment position='end'>
          <Fade in={showClear}>
            <IconButton
              data-testid={`${testId}-clear-btn`}
              size='small'
              {...IconButtonProps}
              {...clearBtnProps}
              onClick={onClear}
            >
              <HighlightOffIcon {...IconProps} />
            </IconButton>
          </Fade>
          <IconButton
            data-testid={`${testId}-submit-btn`}
            size='small'
            disabled={submitDisabled}
            {...IconButtonProps}
            {...submitBtnProps}
            onClick={onSubmit}
          >
            <SearchIcon {...IconProps} />
          </IconButton>
        </InputAdornment>
      }
    />
  )
}

export default SearchField
